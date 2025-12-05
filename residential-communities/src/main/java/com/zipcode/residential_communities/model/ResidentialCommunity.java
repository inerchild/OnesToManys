package com.zipcode.residential_communities.model;


import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "residential_communities")
public class ResidentialCommunity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private Integer numberOfHomes;
    
    private String type; // e.g., "Subdivision", "Apartment Complex", "Gated Community"
    
    private Integer yearEstablished;
    
    private Boolean hasAmenities;
    
    // Many communities belong to one city
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    @JsonBackReference
    private City city;
    
    // Constructors
    public ResidentialCommunity() {}
    
    public ResidentialCommunity(String name, Integer numberOfHomes, String type, 
                                Integer yearEstablished, Boolean hasAmenities) {
        this.name = name;
        this.numberOfHomes = numberOfHomes;
        this.type = type;
        this.yearEstablished = yearEstablished;
        this.hasAmenities = hasAmenities;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Integer getNumberOfHomes() {
        return numberOfHomes;
    }
    
    public void setNumberOfHomes(Integer numberOfHomes) {
        this.numberOfHomes = numberOfHomes;
    }
    
    public String getType() {
        return type;
    }
    
    public void setType(String type) {
        this.type = type;
    }
    
    public Integer getYearEstablished() {
        return yearEstablished;
    }
    
    public void setYearEstablished(Integer yearEstablished) {
        this.yearEstablished = yearEstablished;
    }
    
    public Boolean getHasAmenities() {
        return hasAmenities;
    }
    
    public void setHasAmenities(Boolean hasAmenities) {
        this.hasAmenities = hasAmenities;
    }
    
    public City getCity() {
        return city;
    }
    
    public void setCity(City city) {
        this.city = city;
    }
}