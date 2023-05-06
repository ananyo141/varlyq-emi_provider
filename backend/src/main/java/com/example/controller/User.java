package com.example.controller;


import com.example.constants.ErrorCode;
import com.example.constants.ErrorDescription;
import com.example.modal.request.CreateUserRequest;
import com.example.modal.request.EditUserRequest;
import com.example.modal.request.FetchUserRequest;
import com.example.modal.request.LoginRequest;
import com.example.modal.response.FetchUserDetailResponse;
import com.example.modal.response.FetchUsersResponse;
import com.example.modal.response.GeneralResponse;
import com.example.modal.response.LoginResponse;
import com.example.service.UserService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

@Path("/user")
public class User {

    @Inject
    UserService userService;

    @Path("/login")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public LoginResponse login(LoginRequest request)
    {
        LoginResponse response=new LoginResponse();
        if(request.getUserName()==null || request.getPassword()==null || request.getUserName().isBlank() || request.getPassword().isBlank())
        {
            response.setStatus(false);
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            return response;
        }

        return userService.login(request,response);

    }


    @Path("/create")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public GeneralResponse createUser(CreateUserRequest request)
    {

        GeneralResponse response=new GeneralResponse();
        if(request.getFirstName()==null || request.getFirstName().isBlank()
        || request.getLastName()==null || request.getLastName().isBlank()
        || request.getEmail()==null || request.getEmail().isBlank()
        || request.getContact()==null || request.getContact().isBlank()
        || request.getCompany()==null || request.getCompany().isBlank()
        || request.getUserName()==null || request.getUserName().isBlank()
        || request.getPassword()==null || request.getPassword().isBlank()
        || request.getUserType()==null || request.getCityId()==null)
        {
            System.out.println("invalid");
        response.setStatus(false);
        response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
        return response;
        }

        return userService.createUser(request,response);
    }


    @Path("/fetch/{userId}")
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public FetchUsersResponse fetchUsers(FetchUserRequest request, @PathParam("userId") Long userId)
    {
        FetchUsersResponse response=new FetchUsersResponse();
        com.example.entity.User user=userService.findById(userId);
        if(user==null || request.getPageSize()==null || request.getPage()==null || request.getPage()<0){
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setStatus(false);
            return response;
        }

        return userService.fetchUsers(request,user,response);

    }


    @Path("/edit/{userId}")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public GeneralResponse editUser(EditUserRequest request,@PathParam("userId") Long userId)
    {
        GeneralResponse response=new GeneralResponse();
        if(request.getFirstName()==null || request.getFirstName().isBlank()
                || request.getLastName()==null || request.getLastName().isBlank()
                || request.getEmail()==null || request.getEmail().isBlank()
                || request.getContact()==null || request.getContact().isBlank()
                || request.getCompany()==null || request.getCompany().isBlank()
                || request.getUserName()==null || request.getUserName().isBlank()
                || request.getPassword()==null || request.getPassword().isBlank())
        {
            response.setStatus(false);
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            return response;
        }

        return userService.editUser(request,response,userId);
    }

    @Path("/block-unblock/{userId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public GeneralResponse blockUser(@PathParam("userId") Long userId)
    {
        GeneralResponse response=new GeneralResponse();
        return userService.blockUnblockUser(userId,response);
    }


    @Path("/fetch-user-details/{userId}")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public FetchUserDetailResponse fetchUserDetail(@PathParam("userId") Long userId)
    {
        FetchUserDetailResponse response=new FetchUserDetailResponse();
        return userService.fetchUserDetail(userId,response);
    }


}
