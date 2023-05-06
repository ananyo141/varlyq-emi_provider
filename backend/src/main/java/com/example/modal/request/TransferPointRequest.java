package com.example.modal.request;

public class TransferPointRequest {
    private Integer points;
    private Long transferToId;
    private Long transferFromId;
    private String description;

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Long getTransferToId() {
        return transferToId;
    }

    public void setTransferToId(Long transferToId) {
        this.transferToId = transferToId;
    }

    public Long getTransferFromId() {
        return transferFromId;
    }

    public void setTransferFromId(Long transferFromId) {
        this.transferFromId = transferFromId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
