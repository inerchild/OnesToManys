package com.zipcode.residential_communities.controller;


import com.zipcode.residential_communities.model.City;
import com.zipcode.residential_communities.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cities")
public class CityController {
    
    @Autowired
    private CityRepository cityRepository;
    
    // GET all cities
    @GetMapping
    public ResponseEntity<List<City>> getAllCities() {
        List<City> cities = cityRepository.findAll();
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }
    
    // GET city by ID
    @GetMapping("/{id}")
    public ResponseEntity<City> getCityById(@PathVariable Long id) {
        Optional<City> city = cityRepository.findById(id);
        return city.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                   .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // POST create new city
    @PostMapping
    public ResponseEntity<City> createCity(@RequestBody City city) {
        City savedCity = cityRepository.save(city);
        return new ResponseEntity<>(savedCity, HttpStatus.CREATED);
    }
    
    // PUT update city
    @PutMapping("/{id}")
    public ResponseEntity<City> updateCity(@PathVariable Long id, @RequestBody City cityDetails) {
        Optional<City> cityOptional = cityRepository.findById(id);
        
        if (cityOptional.isPresent()) {
            City city = cityOptional.get();
            city.setName(cityDetails.getName());
            city.setState(cityDetails.getState());
            city.setPopulation(cityDetails.getPopulation());
            city.setMayor(cityDetails.getMayor());
            
            City updatedCity = cityRepository.save(city);
            return new ResponseEntity<>(updatedCity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // DELETE city
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCity(@PathVariable Long id) {
        if (cityRepository.existsById(id)) {
            cityRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}