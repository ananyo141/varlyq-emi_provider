package com.example.service;

import com.example.constants.Enums;
import com.example.constants.ErrorCode;
import com.example.constants.ErrorDescription;
import com.example.entity.Transaction;
import com.example.entity.User;
import com.example.modal.request.FetchTransactionRequest;
import com.example.modal.request.TransferPointRequest;
import com.example.modal.request.WithdrawPointRequest;
import com.example.modal.response.FetchTransactionResponse;
import com.example.modal.response.GeneralResponse;
import com.example.repository.TransactionRepository;
import com.example.repository.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class TransactionService {

    @Inject
    TransactionRepository transactionRepository;

    @Inject
    UserRepository userRepository;


    public GeneralResponse transferPoints(TransferPointRequest request, GeneralResponse response) {
        User transferToUser=userRepository.findById(request.getTransferToId());
        User transferFromUser=userRepository.findById(request.getTransferFromId());

        if(transferToUser==null || transferFromUser==null)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
            response.setStatus(true);
            return response;
        }

        if(transferFromUser.getBalance()<(transferFromUser.getBalance()-request.getPoints()))
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
            response.setStatus(true);
            return response;
        }

        transactionRepository.transfer(transferToUser,transferFromUser,request.getDescription(),request.getPoints());
        response.setStatus(true);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        return response;
    }

    public GeneralResponse withdrawPoints(WithdrawPointRequest request, GeneralResponse response) {
        User withdrawFromUser=userRepository.findById(request.getWithdrawFromId());
        User withdrawToUser=userRepository.findById(request.getWithdrawToId());

        if(withdrawFromUser==null || withdrawToUser==null)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
            response.setStatus(true);
            return response;
        }

        if(withdrawFromUser.getBalance()<(withdrawFromUser.getBalance()-request.getPoints()))
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
            response.setStatus(true);
            return response;
        }

        transactionRepository.withdraw(withdrawToUser,withdrawFromUser,request.getDescription(),request.getPoints());
        response.setStatus(true);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        return response;
    }

    public FetchTransactionResponse fetchTransactions(FetchTransactionRequest request, FetchTransactionResponse response, Long userId) {

    User user=userRepository.findById(userId);
    if(user==null)
    {
        response.setStatus(false);
        response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
        return response;
    }

    List<Transaction> transactionList=transactionRepository.fetchTransactions(request,user,response);
    transactionList.forEach(transaction -> {

        if (transaction.getType().equals(Enums.TransactionType.debit)) {
            transaction.setDebitCreditUserName(transaction.getTransferTo().getFirstName() + " " + transaction.getTransferTo().getLastName());
        } else {
            transaction.setDebitCreditUserName(transaction.getTransferFrom().getFirstName() + " " + transaction.getTransferFrom().getLastName());
        }
    });
    response.setStatus(true);
    response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
    response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
    response.setTransactions(transactionList);
    return response;

    }
}
