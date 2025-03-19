import React, { useState } from "react";
import "./AddBlog.scss";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
const AddBlog = () => {
  //  Model
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleConfirm = (id: string) => {
    setShowModal(false);
  };
  const editorRef = useRef<any>(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <div className="addblog">
      <div className="contentP">
        <h2>Create Blog</h2>
        <hr />
        <div className="managerInputP">
          <div className="item">
            <label>Title Blog</label>
            <input type="text" placeholder="Enter Title Blog" value="haha" />
          </div>{" "}
          <div className="item">
            <label>Description Shot</label>
            <textarea placeholder="Enter Description Shot" value="haha" />
          </div>{" "}
          <div className="item">
            <label>Description</label>
            <Editor
              apiKey="slkxn3po6ill32zhn1nahxuyjlhmvh226r9uawyyc4iam4tu"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>This is the initial content of the editor.</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>{" "}
        </div>

        <div className="btnP">
          <button className="pCancel" onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="pConfirm"
            onClick={() => {
              handleConfirm("1");
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
