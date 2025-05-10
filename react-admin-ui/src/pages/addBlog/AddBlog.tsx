import React, { useState, useRef } from "react";
import "./AddBlog.scss";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCustom } from "../../custom/customApi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import upload from "../../utils/upload";

const AddBlog = () => {
  const [file, setFile] = useState<File | null>(null);
  const editorRef = useRef<any>(null);

  // Quản lý thông tin nhập vào
  const [listInfoBlog, setListInfoBlog] = useState({
    titleBlog: "",
    imgMainBlog: "",
    descripShort: "",
    description: "",
    public_id_image: "",
  });

  // Hàm lấy thông tin từ Editor
  const handleEditorChange = (content: string) => {
    // 1. Chuyển tất cả <a> chứa URL ảnh thành <img> với kích thước cố định
    let updatedContent = content.replace(
      /<a[^>]*href=["'](.*?\.(jpg|jpeg|png|gif))["'][^>]*>.*?<\/a>/gi,
      '<img src="$1" alt="Image" height="370" width="490" />'
    );

    // 2. Chuyển các URL ảnh thuần text thành <img> với kích thước cố định
    updatedContent = updatedContent.replace(
      /https?:\/\/.*?\.(jpg|jpeg|png|gif)(?![^<>]*>)/gi,
      '<img src="$1" alt="Image" height="370" width="490" />'
    );

    // 3. Đảm bảo tất cả <img> tags có kích thước cố định
    updatedContent = updatedContent.replace(
      /<img(?![^>]*height="[^"]*")[^>]*>/gi,
      (match) => match.replace(/>/, ' height="370" width="490" />')
    );

    // 4. Đảm bảo các <img> tags đã có height/width thì giữ nguyên giá trị 370x490
    updatedContent = updatedContent.replace(
      /<img[^>]*height="[^"]*"[^>]*width="[^"]*"[^>]*>/gi,
      (match) =>
        match
          .replace(/height="[^"]*"/, 'height="370"')
          .replace(/width="[^"]*"/, 'width="490"')
    );

    setListInfoBlog((prev) => ({ ...prev, description: updatedContent }));
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
      toast.success("🎉 Blog đã được tạo thành công!");
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error("🚨 Lỗi khi tạo blog. Vui lòng thử lại!");
    },
  });

  // Xác nhận tạo blog mới
  const handleConfirm = async () => {
    const { titleBlog, descripShort, description } = listInfoBlog;
    // Kiểm tra nếu thiếu thông tin
    if (!titleBlog.trim() || !descripShort.trim() || !description.trim()) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    let url = "";
    if (file) {
      url = await upload(file, "blog");
    }

    // Nếu đủ thông tin thì gọi mutation
    mutation.mutate({
      ...listInfoBlog,
      imgMainBlog: url,
    });
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
            <label>Image Blog</label>
            <input
              type="file"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </div>
          <div
            className="item"
            style={{
              color: "black",
            }}
          >
            <label>Title Blog</label>
            <input
              type="text"
              placeholder="Enter Title Blog"
              value={listInfoBlog.titleBlog}
              onChange={(e) => handleChangeInfoBlog(e, "titleBlog")}
            />
          </div>
          <div className="item">
            <label>Description Short</label>
            <textarea
              placeholder="Enter Description Short"
              value={listInfoBlog.descripShort}
              onChange={(e) => handleChangeInfoBlog(e, "descripShort")}
            />
          </div>
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
                  "help",
                  "wordcount",
                  "paste",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help | image",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px } " +
                  "img { height: 370px !important; width: 490px !important; }",

                // Tự động chuyển URL ảnh thành <img> với kích thước cố định khi paste
                paste_preprocess: (plugin, args) => {
                  args.content = args.content.replace(
                    /https?:\/\/.*?\.(jpg|jpeg|png|gif)/gi,
                    (match) =>
                      `<img src="${match}" alt="Image" height="370" width="490" />`
                  );
                },
                // Vô hiệu hóa tự động tạo <a> cho URL
                link_assume_external_targets: true,
                link_context_toolbar: false,
                // Đảm bảo giữ nguyên các thuộc tính height và width
                extended_valid_elements: "img[src|alt|height|width]",
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>

        <div className="btnP">
          <button className="pConfirm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
