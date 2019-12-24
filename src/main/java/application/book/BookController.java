package application.book;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/book")
public class BookController {
    @Autowired
    private BookRepository bookRepository;

    @GetMapping(path = "/all")
    public @ResponseBody
    Iterable<Book> getAllBooks() {
        Iterable<Book> books = bookRepository.findAll();
        return bookRepository.findAll();
    }

    @GetMapping("{id}")
    public Book getBook(@PathVariable int id) {
        return bookRepository.findById(id).get();
    }

}
