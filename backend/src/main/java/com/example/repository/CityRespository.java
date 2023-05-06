package com.example.repository;

import com.example.entity.City;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CityRespository implements PanacheRepository<City> {
}
