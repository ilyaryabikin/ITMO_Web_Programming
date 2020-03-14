package se.ifmo.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;
import se.ifmo.web.checker.PointChecker;
import se.ifmo.web.model.Point;
import se.ifmo.web.model.User;
import se.ifmo.web.repository.PointRepository;
import se.ifmo.web.repository.UserRepository;
import se.ifmo.web.security.JwtTokenProvider;
import se.ifmo.web.service.CustomUserDetailsService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping(value = "/api")
public class RestBackendController {

    @Autowired
    private PointRepository pointRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    JwtTokenProvider jwtTokenProvider;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @GetMapping(value = "/points", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public List<Point> getAllPoints() {
        return pointRepository.findAll();
    }

    @PostMapping(value = "/points", consumes = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public Point savePoint(@Valid @RequestBody Point point) {
        point.setInside(PointChecker.checkAreas(point.getxCoordinate(), point.getyCoordinate(), point.getRadius()));
        return pointRepository.save(point);
    }

    @DeleteMapping(value = "/points")
    @ResponseStatus(HttpStatus.OK)
    public void deletePoints() {
        pointRepository.deleteAll();
    }

    @PostMapping(value = "/login")
    public Map<Object, Object> login(@RequestBody AuthBody data) {
        try {
            String login = data.getLogin();
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login, data.getPassword()));
            String token = jwtTokenProvider.createToken(login);
            Map<Object, Object> model = new HashMap<>();
            model.put("username", login);
            model.put("token", token);
            return model;
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid password/login");
        }
    }

    @PostMapping(value = "/register")
    public Map<Object, Object> register(@RequestBody User user) {
        String some = user.getLogin();
        if (userRepository.findByLogin(some).isPresent()) {
            throw new BadCredentialsException("User with login " + user.getLogin() + " already exists");
        }
        userDetailsService.saveUser(user);
        Map<Object, Object> model = new HashMap<>();
        model.put("message", "User registered successfully");
        return model;
    }
}
