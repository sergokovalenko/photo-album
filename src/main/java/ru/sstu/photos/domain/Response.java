package ru.sstu.photos.domain;

public class Response {

    private String text;

    private Response() {}

    public Response(String text) {
        this.text = text;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
