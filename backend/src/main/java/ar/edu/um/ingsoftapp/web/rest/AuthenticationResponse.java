package ar.edu.um.ingsoftapp.web.rest;

public class AuthenticationResponse {

    private String jwt;
    private Long userId;

    public AuthenticationResponse(String jwt, Long userId) {
        this.jwt = jwt;
        this.userId = userId;
    }

    // Getters and setters

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
