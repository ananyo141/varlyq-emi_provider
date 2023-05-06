package com.example.modal.request;

public class WithdrawPointRequest {
    private Integer points;
    private Long withdrawToId;
    private Long withdrawFromId;
    private String description;

    public Integer getPoints() {
        return points;
    }

    public void setPoints(Integer points) {
        this.points = points;
    }

    public Long getWithdrawToId() {
        return withdrawToId;
    }

    public void setWithdrawToId(Long withdrawToId) {
        this.withdrawToId = withdrawToId;
    }

    public Long getWithdrawFromId() {
        return withdrawFromId;
    }

    public void setWithdrawFromId(Long withdrawFromId) {
        this.withdrawFromId = withdrawFromId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
