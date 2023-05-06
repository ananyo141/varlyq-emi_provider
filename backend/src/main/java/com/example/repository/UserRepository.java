package com.example.repository;

import com.example.constants.Enums;
import com.example.entity.City;
import com.example.entity.User;
import com.example.modal.request.CreateUserRequest;
import com.example.modal.request.EditUserRequest;
import com.example.modal.request.FetchUserRequest;
import com.example.modal.response.FetchUsersResponse;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class UserRepository implements PanacheRepository<User> {
    public User getUserByUserName(String userName) {
        Query query = getEntityManager().createQuery("select User from User User where User.userName=:userName");
        query.setParameter("userName", userName);
        List list = query.getResultList();
        if (list.isEmpty()) {
            return null;
        } else {
            return (User) list.get(0);
        }
    }

    public User getUserByUserNameOrContact(String userName, String contact) {
        Query query = getEntityManager().createQuery("select User from User User where User.userName=:userName and User.mobile=:mobile");
        query.setParameter("userName", userName);
        query.setParameter("mobile", contact);
        List list = query.getResultList();
        if (list.isEmpty()) {
            return null;
        } else {
            return (User) list.get(0);
        }
    }


    @Transactional(rollbackOn = Exception.class)
    public void createUser(CreateUserRequest request, City city, User parent) {
        User user = new User();
        user.setBalance(0);
        user.setCity(city);
        user.setCompany(request.getCompany());
        user.setCreatedAt(System.currentTimeMillis());
        user.setEmail(request.getEmail());
        user.setUserName(request.getUserName());
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setStatus(true);
        user.setPassword(request.getPassword());
        if (request.getGst() != null)
            user.setGSTN(request.getGst());
        user.setParent(parent);
        user.setMobile(request.getContact());
        user.setUserType(request.getUserType());
        if (request.getAddress() != null)
            user.setAddress(request.getAddress());
        persist(user);
    }


    public List<User> fetchUsers(FetchUserRequest request, User user, FetchUsersResponse response) {
        Query query=null;
        if(user.getUserType().equals(Enums.UserType.superDistributor) && request.getUserType().equals(Enums.UserType.distributor))
        {
           query= getEntityManager().createQuery("select User from User User where  User.userType=:type");
           query.setParameter("type",Enums.UserType.distributor);

        }if(user.getUserType().equals(Enums.UserType.superDistributor) && request.getUserType().equals(Enums.UserType.retailer))
        {
           query= getEntityManager().createQuery("select User from User User where  User.userType=:type");
           query.setParameter("type",Enums.UserType.retailer);

        }
        if(user.getUserType().equals(Enums.UserType.distributor))
        {
            query= getEntityManager().createQuery("select User from User User where User.parent.id=:parentId and  User.userType=:type");
            query.setParameter("type",Enums.UserType.retailer);
            query.setParameter("parentId",user.getId());
        }
        response.setCount(query.getResultList().stream().count());
        query.setMaxResults(request.getPageSize());
        query.setFirstResult(request.getPage()*request.getPageSize());
        return query.getResultList();
    }

    @Transactional(rollbackOn = Exception.class)
    public void editUser(EditUserRequest request, City city, User user) {
        Query query = getEntityManager().createQuery("update User User set User.firstName=:firstName," +
                "User.lastName=:lastName,User.email=:email,User.mobile=:mobile,User.company=:company," +
                "User.GSTN=:gst,User.userName=:userName,User.password=:password,User.city=:city,User.address=:address where User.id=:id");

        query.setParameter("firstName", request.getFirstName());
        query.setParameter("lastName", request.getLastName());
        query.setParameter("email", request.getEmail());
        query.setParameter("mobile", request.getContact());
        query.setParameter("company", request.getCompany());
        if (request.getGst() == null) {
            query.setParameter("gst", null);
        } else {
            query.setParameter("gst", request.getGst());
        }
        query.setParameter("gst", request.getGst());
        query.setParameter("userName", request.getUserName());
        query.setParameter("password", request.getPassword());
        query.setParameter("city", city);
        if (request.getAddress() == null) {
            query.setParameter("address", null);
        }
        {
            query.setParameter("address", request.getAddress());
        }
        query.setParameter("id", user.getId());
        query.executeUpdate();
    }

    @Transactional(rollbackOn = Exception.class)
    public void debitPoint(User user, Integer points) {
        Query query= getEntityManager().createQuery("update User User set User.balance=:balance where User.id=:id");
        query.setParameter("balance",user.getBalance()-points);
        query.setParameter("id",user.getId());
        query.executeUpdate();
    }

    @Transactional(rollbackOn = Exception.class)
    public void creditPoint(User user, Integer points) {
        Query query= getEntityManager().createQuery("update User User set User.balance=:balance where User.id=:id");
        query.setParameter("balance",user.getBalance()+points);
        query.setParameter("id",user.getId());
        query.executeUpdate();
    }

    public List<User> fetchDistributors(User user,Integer page,Integer pageSize) {
        Query query = getEntityManager().createQuery("select User from User User where User.parent.id=:parentId and User.userType=:type");
        query.setParameter("parentId", user.getParent().getId());
        query.setParameter("type", Enums.UserType.distributor);
        query.setMaxResults(page);
        query.setFirstResult(page*pageSize);
        return query.getResultList();
    }

    @Transactional(rollbackOn = Exception.class)
    public void blockUnblockUser(User user) {
        Query query= getEntityManager().createQuery("update User User set User.status=:status where User.id=:id");
        query.setParameter("id",user.getId());
        query.setParameter("status",!user.getStatus());
        query.executeUpdate();
    }



}
