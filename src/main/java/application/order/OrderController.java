package application.order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/order")
public class OrderController {
    @Autowired
    private OrderRepository orderRepository;

    @PostMapping(path = "/add")
    public @ResponseBody
    String addNewOrder(@RequestParam String name, @RequestParam String email) {
        Order n = new Order();
        n.setName(name);
        n.setEmail(email);
        orderRepository.save(n);
        return "Saved";
    }

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Order> getAllOrders() {
        // This returns a JSON or XML with the orders
        return orderRepository.findAll();
    }
}