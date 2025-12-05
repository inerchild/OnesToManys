package com.zipcode.residential_communities.repository;



import com.zipcode.residential_communities.model.ResidentialCommunity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResidentialCommunityRepository extends JpaRepository<ResidentialCommunity, Long> {
    // Custom query method to find communities by city
    List<ResidentialCommunity> findByCityId(Long cityId);
}