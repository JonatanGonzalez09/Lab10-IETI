package eci.ieti.controller;

import eci.ieti.data.TodoRepository;
import eci.ieti.data.model.Todo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import com.mongodb.client.gridfs.model.GridFSFile;

@CrossOrigin("*")
@RequestMapping("/api")
@RestController
public class RESTController {

   //TODO inject components (TodoRepository and GridFsTemplate)
   @Autowired
   TodoRepository todoRepo;

   @Autowired
   GridFsTemplate gridFsTemplate;


    @RequestMapping("/files/{filename}")
    public ResponseEntity<InputStreamResource> getFileByName(@PathVariable String filename) throws IOException {
        //TODO implement method
        System.out.println("Rerceived request for file: " + filename);
        GridFSFile file = gridFsTemplate.findOne(new Query().addCriteria(Criteria.where("filename").is(filename)));
        ResponseEntity response = new ResponseEntity<>(HttpStatus.NOT_FOUND);

        if (file != null){
            GridFsResource resource = gridFsTemplate.getResource(file.getFilename());
            response = ResponseEntity.ok()
                    .contentType(MediaType.valueOf(resource.getContentType()))
                    .body(new InputStreamResource(resource.getInputStream()));

        }
        return response;

    }

    @CrossOrigin("*")
    @PostMapping("/files")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, RedirectAttributes redirectAttributes) throws IOException {

        //TODO implement method
        gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
        return file.getOriginalFilename();
    }

    @CrossOrigin("*")
    @PostMapping("/todo")
    public Todo createTodo(@RequestBody Todo todo) {
        System.out.println(todo);
        todoRepo.save(todo);
        return todo;
    }

    @CrossOrigin("*")
    @GetMapping("/todo")
    public List<Todo> getTodoList() {
        return todoRepo.findAll();
    }

}
