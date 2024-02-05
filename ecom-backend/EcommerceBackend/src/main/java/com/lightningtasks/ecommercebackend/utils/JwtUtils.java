
package com.lightningtasks.ecommercebackend.utils;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;
import java.security.Key;
import java.util.Date;


@Component
public class JwtUtils {
    @Value("${app.jwt.expiration-ms}")
    private int jwtExpirationMs;
    public String generateJwtToken(Authentication authentication) {
        User userPrincipal = (User) authentication.getPrincipal();
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
                .signWith(key)
                .compact();
    }
    public String getUsernameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(getKey()).parseClaimsJws(token).getBody().getSubject();
    }
    public boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(getKey()).parseClaimsJws(authToken);
            return true;
        } catch (Exception e) {
            // Log the exception if needed
        }
        return false;
    }
    private Key getKey() {
        return Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }
}
