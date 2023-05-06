package com.example.entity;

import com.example.constants.Enums;

import javax.persistence.*;

@Entity
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String transactionId;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    User transferFrom;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    User transferTo;

    private String description;
    private Long timestamp;
    private Integer points;

    @Transient
    private String debitCreditUserName;

    @ManyToOne(targetEntity = User.class,fetch = FetchType.LAZY)
    private User user;


    public String getDebitCreditUserName() {
        return debitCreditUserName;
    }

    public void setDebitCreditUserName(String debitCreditUserName) {
        this.debitCreditUserName = debitCreditUserName;
    }

    private Enums.TransactionType type;

    public Enums.TransactionType getType() {
        return type;
    }

    public void setType(Enums.TransactionType type) {
        this.type = type;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public User getTransferFrom() {
        return transferFrom;
    }

    public void setTransferFrom(User transferFrom) {
        this.transferFrom = transferFrom;
    }

    public User getTransferTo() {
        return transferTo;
    }

    public void setTransferTo(User transferTo) {
        this.transferTo = transferTo;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
