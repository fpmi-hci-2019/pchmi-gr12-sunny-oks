package application.book;

import application.author.Author;

import javax.persistence.*;
import java.util.LinkedList;
import java.util.List;

@Entity
public class Book {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name = "idBook")
    private Integer id;

    @Column(name = "name")
    private String name;

    private String description;

    private String genre;

    private Double cost;

    @ManyToMany(cascade = { CascadeType.ALL })
    @JoinTable(
            name = "book_has_author",
            joinColumns = { @JoinColumn(name = "Author_idAuthor") },
            inverseJoinColumns = { @JoinColumn(name = "Book_idBook") }
    )
    List<Author> authors = new LinkedList<>();

    @Lob
    @Column(name = "picture", columnDefinition="BLOB")
    private byte[] picture;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    public List<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(List<Author> projects) {
        this.authors = authors;
    }
}