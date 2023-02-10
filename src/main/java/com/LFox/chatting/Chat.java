package com.LFox.chatting;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection="chat")
public class Chat {

	@Id
	private String id;
	private String message;
	private String sender;
	private Integer roomNum;
	
	private LocalDateTime createdAt;
}
