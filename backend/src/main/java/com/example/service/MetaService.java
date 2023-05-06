package com.example.service;

import com.example.entity.State;
import com.example.repository.StateRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import java.util.List;

@ApplicationScoped
public class MetaService {

    @Inject
    StateRepository stateRepository;
    public List<State> getStates() {
        return  stateRepository.listAll();
    }
}
