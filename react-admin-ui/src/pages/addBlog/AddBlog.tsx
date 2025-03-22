import React, { useState } from "react";
import "./AddBlog.scss";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const AddBlog = () => {
  const editorRef = useRef<any>(null);

  // quan ly thong tin nhap vao
  const [listInfoBlog, setListInfoBlog] = useState({
    titleBlog: "",
    descripShort: "",
    description: "",
  });
  // Hàm lấy thông tin từ Editor
  const handleEditorChange = (content: string) => {
    setListInfoBlog((prev) => ({ ...prev, description: content }));
  };
  const handleChangeInfoBlog = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    valueChange: string
  ) => {
    setListInfoBlog((prev) => ({ ...prev, [valueChange]: e.target.value }));
  };

  // API CREATE

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (info: {}) => {
      return apiCustom.post(`blog`, info);
    },
    onSuccess: (response) => {
      // queryClient.invalidateQueries([`all${props.slug}`]);
      toast.success("🎉 Blog đã được tạo thành công!");
      navigate("/addBlog");
    },
    onError: (error) => {
      // ❌ Thất bại -> Thông báo lỗi
      toast.error("🚨 Lỗi khi tạo blog. Vui lòng thử lại!");
    },
  });

  // xác nhận tạo blog mới
  const handleConfirm = () => {
    const { titleBlog, descripShort, description } = listInfoBlog;

    // Kiểm tra nếu thiếu thông tin
    if (!titleBlog.trim() || !descripShort.trim() || !description.trim()) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    // Nếu đủ thông tin thì gọi mutation
    mutation.mutate(listInfoBlog);
  };
  return (
    <div className="addblog">
      <div className="contentP">
        <h2>Create Blog</h2>
        <hr />
        <div className="managerInputP">
          <div
            className="item"
            style={{
              color: "black",
            }}
          >
            <label>Title Blog</label>
            <input
              type="text"
              placeholder="Enter Title Blog  "
              value={listInfoBlog.titleBlog}
              onChange={(e) => handleChangeInfoBlog(e, "titleBlog")}
            />
          </div>{" "}
          <div className="item">
            <label>Description Shot</label>
            <textarea
              placeholder="Enter Description Shot"
              value={listInfoBlog.descripShort}
              onChange={(e) => handleChangeInfoBlog(e, "descripShort")}
            />
          </div>{" "}
          <div className="item">
            <label>Description</label>
            <Editor
              apiKey="slkxn3po6ill32zhn1nahxuyjlhmvh226r9uawyyc4iam4tu"
              onInit={(_evt, editor) => (editorRef.current = editor)}
              initialValue="<p>Please enter description.</p>"
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
              onEditorChange={handleEditorChange} // Lắng nghe thay đổi
            />
          </div>{" "}
        </div>

        <div className="btnP">
          <button
            className="pConfirm"
            onClick={() => {
              handleConfirm();
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
