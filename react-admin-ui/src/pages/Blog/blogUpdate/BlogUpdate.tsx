import React, { useEffect, useState } from "react";
import "../addBlog/AddBlog.scss";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { apiCustom } from "../../../custom/customApi";
import upload from "../../../utils/upload";

const BlogUpdate = () => {
  // Quản lý thông tin nhập vào
  const [listInfoBlog, setListInfoBlog] = useState({
    titleBlog: "",
    imgMainBlog: "",
    descripShort: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [initValue, setInitValue] = useState("");

  // Lấy thông tin của blog ra để in ra
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["singleBlog"],
    queryFn: () => apiCustom.get(`/blog/${id}`).then((res) => res.data),
  });

  // Sau khi lấy data từ API
  useEffect(() => {
    if (data) {
      setListInfoBlog({
        titleBlog: data?.blog?.titleBlog || "",
        descripShort: data?.blog?.descripShort || "",
        description: data?.blog?.description || "",
        imgMainBlog: data?.blog?.imgMainBlog || "",
      });
      setInitValue(data?.blog?.description || "");
    }
  }, [data]);

  // Hàm lấy thông tin từ Editor
  const editorRef = useRef<any>(null);
  const handleEditorChange = (content: string) => {
    // 1. Chuyển tất cả <a> chứa URL ảnh thành <img>
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

    const trimmedContent = updatedContent.trim();
    setListInfoBlog((prev) => {
      if (prev.description.trim() === trimmedContent) return prev;
      return { ...prev, description: trimmedContent };
    });
  };

  const handleChangeInfoBlog = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    valueChange: string
  ) => {
    setListInfoBlog((prev) => ({
      ...prev,
      [valueChange]: e.target.value || "",
    }));
  };

  // API UPDATE
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (info: {}) => {
      return apiCustom.put(`/blog/${id}`, info);
    },
    onSuccess: (response) => {
      toast.success("🎉 Blog đã được cập nhật thành công!");
      navigate("/blogs");
    },
    onError: (error) => {
      toast.error("🚨 Lỗi khi cập nhật blog. Vui lòng thử lại!");
    },
  });

  // Xác nhận update blog
  const handleConfirm = async () => {
    const { titleBlog, descripShort, description } = listInfoBlog;
    if (!titleBlog.trim() || !descripShort.trim() || !description.trim()) {
      toast.error("⚠️ Vui lòng điền đầy đủ thông tin tất cả các trường!");
      return;
    }

    const url = file ? await upload(file, "blog") : listInfoBlog.imgMainBlog;
    mutation.mutate({ ...listInfoBlog, imgMainBlog: url });
  };

  return (
    <div className="addblog">
      <div className="contentP">
        <h2>Edit Blog</h2>
        <hr />
        <div className="managerInputP">
          <div className="fileUpdate">
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
            <div className="manageImg">
              <img src={listInfoBlog.imgMainBlog} alt="" />
            </div>
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
              initialValue={initValue}
              init={{
                height: 500,
                menubar: false,
                paste_as_text: true,
                directionality: "ltr",
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
                  "undo redo | blocks | bold italic forecolor | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | removeformat | help",
                content_style: `
                  body { 
                    font-family: Helvetica, Arial, sans-serif; 
                    font-size: 14px; 
                    direction: ltr !important;
                    text-align: left !important;
                  }
                  img {
                    height: 70px !important;
                    width: 90px !important;
                  }
                  h1 {
                    font-size: 2em !important; /* Kích thước lớn hơn cho <h1> */
                    font-weight: bold !important;
                    margin: 0.67em 0 !important;
                  }
                `,
                paste_preprocess: (plugin, args) => {
                  args.content = args.content.replace(
                    /https?:\/\/.*?\.(jpg|jpeg|png|gif)/gi,
                    (match) =>
                      `<img src="${match}" alt="Image" height="370" width="490" />`
                  );
                },
                link_assume_external_targets: true,
                link_context_toolbar: false,
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>

        <div className="btnP">
          <button
            className="pCancel"
            onClick={() => {
              navigate("/blogs");
            }}
          >
            Cancel
          </button>
          <button className="pConfirm" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogUpdate;
