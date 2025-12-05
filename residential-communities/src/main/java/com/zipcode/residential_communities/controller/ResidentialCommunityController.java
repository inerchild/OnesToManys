package com.zipcode.residential_communities.controller;


import com.zipcode.residential_communities.model.ResidentialCommunity;
import com.zipcode.residential_communities.model.City;
import com.zipcode.residential_communities.repository.ResidentialCommunityRepository;
import com.zipcode.residential_communities.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/communities")
public class ResidentialCommunityController {
    
    @Autowired
    private ResidentialCommunityRepository communityRepository;
    
    @Autowired
    private CityRepository cityRepository;
    
    // GET all communities
    @GetMapping
    public ResponseEntity<List<ResidentialCommunity>> getAllCommunities() {
        List<ResidentialCommunity> communities = communityRepository.findAll();
        return new ResponseEntity<>(communities, HttpStatus.OK);
    }
    
    // GET community by ID
    @GetMapping("/{id}")
    public ResponseEntity<ResidentialCommunity> getCommunityById(@PathVariable Long id) {
        Optional<ResidentialCommunity> community = communityRepository.findById(id);
        return community.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    
    // POST create new community
    @PostMapping
    public ResponseEntity<ResidentialCommunity> createCommunity(@RequestBody ResidentialCommunity community) {
        ResidentialCommunity savedCommunity = communityRepository.save(community);
        return new ResponseEntity<>(savedCommunity, HttpStatus.CREATED);
    }
    
    // PUT update community
    @PutMapping("/{id}")
    public ResponseEntity<ResidentialCommunity> updateCommunity(
            @PathVariable Long id, 
            @RequestBody ResidentialCommunity communityDetails) {
        Optional<ResidentialCommunity> communityOptional = communityRepository.findById(id);
        
        if (communityOptional.isPresent()) {
            ResidentialCommunity community = communityOptional.get();
            community.setName(communityDetails.getName());
            community.setNumberOfHomes(communityDetails.getNumberOfHomes());
            community.setType(communityDetails.getType());
            community.setYearEstablished(communityDetails.getYearEstablished());
            community.setHasAmenities(communityDetails.getHasAmenities());
            
            ResidentialCommunity updatedCommunity = communityRepository.save(community);
            return new ResponseEntity<>(updatedCommunity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // DELETE community
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunity(@PathVariable Long id) {
        if (communityRepository.existsById(id)) {
            communityRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    // GET communities by city ID (Phase 2 preview)
    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<ResidentialCommunity>> getCommunitiesByCity(@PathVariable Long cityId) {
        List<ResidentialCommunity> communities = communityRepository.findByCityId(cityId);
        return new ResponseEntity<>(communities, HttpStatus.OK);
    }
}