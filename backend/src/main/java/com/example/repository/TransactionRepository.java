package com.example.repository;

import com.example.constants.Enums;
import com.example.entity.Transaction;
import com.example.entity.User;
import com.example.modal.request.FetchTransactionRequest;
import com.example.modal.response.FetchTransactionResponse;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class TransactionRepository implements PanacheRepository<Transaction> {

    @Inject
    UserRepository userRepository;


    @Transactional(rollbackOn = Exception.class)
    public void transfer(User transferToUser, User transferFromUser, String description, Integer points) {
        Transaction creditTransaction=new Transaction();
        creditTransaction.setDescription(description);
        creditTransaction.setPoints(points);
        creditTransaction.setTransactionId("U"+transferFromUser.getId()+"U"+transferToUser.getId()+"T"+System.currentTimeMillis());
        creditTransaction.setTimestamp(System.currentTimeMillis());
        creditTransaction.setTransferTo(transferToUser);
        creditTransaction.setTransferFrom(transferFromUser);
        creditTransaction.setType(Enums.TransactionType.credit);
        creditTransaction.setUser(transferToUser);
        persist(creditTransaction);
        userRepository.creditPoint(transferToUser,points);
        Transaction debitTransaction=new Transaction();
        debitTransaction.setDescription(description);
        debitTransaction.setPoints(points);
        debitTransaction.setTransactionId("U"+transferFromUser.getId()+"U"+transferToUser.getId()+"T"+System.currentTimeMillis());
        debitTransaction.setTimestamp(System.currentTimeMillis());
        debitTransaction.setTransferTo(transferToUser);
        debitTransaction.setTransferFrom(transferFromUser);
        debitTransaction.setUser(transferFromUser);
        debitTransaction.setType(Enums.TransactionType.debit);
        persist(debitTransaction);
        userRepository.debitPoint(transferFromUser,points);

    }

    @Transactional(rollbackOn = Exception.class)
    public void withdraw(User withdrawToUser, User withdrawFromUser, String description, Integer points) {
        Transaction creditTransaction=new Transaction();
        creditTransaction.setDescription(description);
        creditTransaction.setPoints(points);
        creditTransaction.setTransactionId("U"+withdrawFromUser.getId()+"U"+withdrawToUser.getId()+"T"+System.currentTimeMillis());
        creditTransaction.setTimestamp(System.currentTimeMillis());
        creditTransaction.setTransferTo(withdrawToUser);
        creditTransaction.setTransferFrom(withdrawFromUser);
        creditTransaction.setType(Enums.TransactionType.credit);
        creditTransaction.setUser(withdrawToUser);
        persist(creditTransaction);
        userRepository.creditPoint(withdrawToUser,points);
        Transaction debitTransaction=new Transaction();
        debitTransaction.setDescription(description);
        debitTransaction.setPoints(points);
        debitTransaction.setTransactionId("U"+withdrawFromUser.getId()+"U"+withdrawToUser.getId()+"T"+System.currentTimeMillis());
        debitTransaction.setTimestamp(System.currentTimeMillis());
        debitTransaction.setTransferTo(withdrawToUser);
        debitTransaction.setTransferFrom(withdrawFromUser);
        debitTransaction.setType(Enums.TransactionType.debit);
        debitTransaction.setUser(withdrawFromUser);
        persist(debitTransaction);
        userRepository.debitPoint(withdrawFromUser,points);
    }

    public List<Transaction> fetchTransactions(FetchTransactionRequest request, User user, FetchTransactionResponse response) {
        Query query= getEntityManager().createQuery("select Transaction from Transaction Transaction where Transaction.user.id=:userId order by Transaction.id desc ");
        query.setParameter("userId",user.getId());
        response.setCount((long) query.getResultList().size());
        query.setMaxResults(request.getPageSize());
        query.setFirstResult(request.getPage()*request.getPageSize());
        return query.getResultList();
    }
}
