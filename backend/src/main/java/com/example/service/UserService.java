package com.example.service;

import com.example.constants.ErrorCode;
import com.example.constants.ErrorDescription;
import com.example.entity.City;
import com.example.entity.User;
import com.example.modal.request.CreateUserRequest;
import com.example.modal.request.EditUserRequest;
import com.example.modal.request.FetchUserRequest;
import com.example.modal.request.LoginRequest;
import com.example.modal.response.FetchUserDetailResponse;
import com.example.modal.response.FetchUsersResponse;
import com.example.modal.response.GeneralResponse;
import com.example.modal.response.LoginResponse;
import com.example.repository.CityRespository;
import com.example.repository.UserRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    CityRespository cityRespository;

    public LoginResponse login(LoginRequest request, LoginResponse response) {

        User user=userRepository.getUserByUserName(request.getUserName());
        if(user==null)
        {
            response.setStatus(false);
            response.setErrorCode(ErrorCode.ERROR_CODE_USER_NOT_FOUND);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_USER_NOT_FOUND);
            return response;
        }

        if(!user.getPassword().equals(request.getPassword().trim()))
        {
            response.setStatus(false);
            response.setErrorCode(ErrorCode.ERROR_CODE_CREDENTIALS_MISMATCH);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_CREDENTIALS_MISMATCH);
            return response;
        }
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setUser(user);
        response.setStatus(true);
        return response;
    }

    public GeneralResponse createUser(CreateUserRequest request, GeneralResponse response) {
        User user=userRepository.getUserByUserNameOrContact(request.getUserName().trim(),request.getContact().trim());
        if(user!=null)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_USER_ALREADY_EXISTS);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_USER_ALREADY_EXISTS);
            response.setStatus(false);
            return response;
        }
        User parent=userRepository.findById(request.getParentId());
        City city=cityRespository.findById(request.getCityId());
        System.out.println(parent);
        System.out.println(city);
        if(city==null || parent==null)
        {

            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setStatus(false);
            return response;
        }
        userRepository.createUser(request,city,parent);
        response.setStatus(true);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        return response;
    }

    public User findById(Long userId) {
        return userRepository.findById(userId);
    }

    public FetchUsersResponse fetchUsers(FetchUserRequest request, User user, FetchUsersResponse response) {
//        List<User> users=userRepository.fetchUsers(request,user);
        List<User> users=userRepository.fetchUsers(request,user,response);
        users.forEach(user1 -> {
            user1.setState(user1.getCity().getState());
            user1.setAdmin(user1.getParent().getFirstName()+" "+user1.getParent().getLastName());
            user1.setParentId(user1.getParent().getId());
        });
        response.setStatus(true);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        response.setUsers(users);
        return response;
    }

    public GeneralResponse editUser(EditUserRequest request, GeneralResponse response,Long userId) {

        User user=userRepository.findById(userId);
        if(user==null)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_USER_ALREADY_EXISTS);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_USER_ALREADY_EXISTS);
            response.setStatus(false);
            return response;
        }

        User existUser=userRepository.getUserByUserNameOrContact(request.getUserName().trim(), request.getContact().trim());
        if(existUser!=null && existUser.getId().longValue()!=user.getId().longValue())
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_USER_ALREADY_EXISTS);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_USER_ALREADY_EXISTS);
            response.setStatus(false);
            return response;
        }

        City city=cityRespository.findById(request.getCityId());
        if(city==null)
        {
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setStatus(false);
            return response;
        }
        userRepository.editUser(request,city,user);
        response.setStatus(true);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        return response;
    }

    public GeneralResponse blockUnblockUser(Long userId, GeneralResponse response) {
        User user=userRepository.findById(userId);
        if(user==null)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setStatus(false);
            return response;
        }
        userRepository.blockUnblockUser(user);
        response.setStatus(true);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        return response;
    }


    public FetchUserDetailResponse fetchUserDetail(Long userId, FetchUserDetailResponse response) {
        User user=userRepository.findById(userId);
        if(user==null)
        {
            response.setErrorCode(ErrorCode.ERROR_CODE_INVALID_REQUEST);
            response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_INVALID_REQUEST);
            response.setStatus(false);
            return response;
        }
        user.setState(user.getCity().getState());
        response.setErrorCode(ErrorCode.ERROR_CODE_SUCCESS);
        response.setErrorDescription(ErrorDescription.ERROR_DESCRIPTION_SUCCESS);
        response.setStatus(true);
        response.setUser(user);
        return response;
    }
}
