package com.zipcode.residential_communities.repository;



import com.zipcode.residential_communities.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {
    // JpaRepository provides: save, findById, findAll, deleteById, etc.
}