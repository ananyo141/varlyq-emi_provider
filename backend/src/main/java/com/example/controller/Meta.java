package com.example.controller;

import com.example.constants.ErrorCode;
import com.example.constants.ErrorDescription;
import com.example.entity.State;
import com.example.modal.response.MetaResponse;
import com.example.service.MetaService;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/meta")
public class Meta {

    @Inject
    MetaService metaService;
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public MetaResponse getMeta()
    {
        MetaResponse metaResponse=new MetaResponse();
        List<State> states=metaService.getStates();
        metaResponse.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        metaResponse.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        metaResponse.setStatus(true);
        metaResponse.setStates(states);
        return metaResponse;
    }
}
