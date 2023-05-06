package com.example.controller;

import com.example.constants.ErrorCode;
import com.example.constants.ErrorDescription;
import com.example.modal.request.FetchTransactionRequest;
import com.example.modal.request.FetchUserRequest;
import com.example.modal.request.TransferPointRequest;
import com.example.modal.request.WithdrawPointRequest;
import com.example.modal.response.FetchTransactionResponse;
import com.example.modal.response.GeneralResponse;
import com.example.service.TransactionService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/transaction")
public class Transaction {

    @Inject
    TransactionService transactionService;

    @Path("/transfer")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public GeneralResponse transferPoints(TransferPointRequest request) {


        GeneralResponse response = new GeneralResponse();
        if (request.getPoints() == null || request.getPoints() <= 0 || request.getTransferToId() == null || request.getTransferFromId() == null || request.getDescription() == null || request.getDescription().isBlank()) {
            response.setStatus(false);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            return response;
        }

        return transactionService.transferPoints(request, response);


    }

    @Path("/withdraw")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public GeneralResponse withdrawPoints(WithdrawPointRequest request) {


        GeneralResponse response = new GeneralResponse();
        if (request.getPoints() == null || request.getPoints() <= 0 || request.getWithdrawToId() == null || request.getWithdrawFromId() == null || request.getDescription() == null || request.getDescription().isBlank()) {
            response.setStatus(false);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            return response;
        }

        return transactionService.withdrawPoints(request, response);


    }

    @Path("/fetch/{userId}")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public FetchTransactionResponse fetchTransaction(FetchTransactionRequest request, @PathParam("userId") Long userId)
    {
        FetchTransactionResponse response=new FetchTransactionResponse();
        if(request.getPage()==null || request.getPageSize()==null || request.getPage()<0)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setStatus(false);
            return response;
        }

        return transactionService.fetchTransactions(request,response,userId);
    }


}
