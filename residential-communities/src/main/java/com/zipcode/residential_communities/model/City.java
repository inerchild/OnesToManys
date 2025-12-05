

package com.zipcode.residential_communities.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cities")
public class City {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    private String state;
    
    private Integer population;
    
    private String mayor;
    
    // One city has many residential communities
    @OneToMany(mappedBy = "city", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ResidentialCommunity> communities = new ArrayList<>();
    
    // Constructors
    public City() {}
    
    public City(String name, String state, Integer population, String mayor) {
        this.name = name;
        this.state = state;
        this.population = population;
        this.mayor = mayor;
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
    
    public String getState() {
        return state;
    }
    
    public void setState(String state) {
        this.state = state;
    }
    
    public Integer getPopulation() {
        return population;
    }
    
    public void setPopulation(Integer population) {
        this.population = population;
    }
    
    public String getMayor() {
        return mayor;
    }
    
    public void setMayor(String mayor) {
        this.mayor = mayor;
    }
    
    public List<ResidentialCommunity> getCommunities() {
        return communities;
    }
    
    public void setCommunities(List<ResidentialCommunity> communities) {
        this.communities = communities;
    }
    
    // Helper method to add community
    public void addCommunity(ResidentialCommunity community) {
        communities.add(community);
        community.setCity(this);
    }
}