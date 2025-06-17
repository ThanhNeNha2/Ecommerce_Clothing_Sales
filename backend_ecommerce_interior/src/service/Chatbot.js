const processMessage = async (message) => {
  const priceMatch = message.match(/dưới (\d+)/i);
  const genderMatch = message.match(/cho (nam|nữ)/i);
  const categoryMatch = message.match(/loại (\w+)/i); // Ví dụ: "loại áo"

  let queryParams = "";
  if (priceMatch) {
    const maxPrice = Number(priceMatch[1]);
    queryParams += `maxPrice=${maxPrice}`;
  }
  if (genderMatch) {
    const gender = genderMatch[1] === "nam" ? "Nam" : "Nữ";
    queryParams += `${queryParams ? "&" : ""}gender=${gender}`;
  }
  if (categoryMatch) {
    const category = categoryMatch[1];
    queryParams += `${queryParams ? "&" : ""}mainCategory=${category}`;
  }

  if (queryParams) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/chatbot?${queryParams}&page=1&limit=5`
      );
      const { products, total } = response.data;

      if (products.length === 0) {
        return `Không tìm thấy sản phẩm nào phù hợp.`;
      }

      let reply = `Dưới đây là các sản phẩm phù hợp:\n`;
      products.forEach((product, index) => {
        reply += `${index + 1}. ${product.name} - Giá: ${product.price}\n`;
        if (product.image) reply += `Hình ảnh: ${product.image}\n`;
      });
      if (total > 5) reply += `\nNhập 'xem thêm' để thấy thêm sản phẩm.`;
      return reply;
    } catch (error) {
      return "Có lỗi xảy ra khi tìm kiếm sản phẩm. Vui lòng thử lại!";
    }
  }

  return "Xin lỗi, tôi chưa hiểu yêu cầu của bạn. Bạn có thể nói rõ hơn không? Ví dụ: 'Tôi muốn tìm sản phẩm dưới 500 cho nam'.";
};

// Xử lý 'xem thêm'
const handleSeeMore = async () => {
  const currentPage =
    messages.filter((m) => m.sender === "bot" && m.text.includes("xem thêm"))
      .length + 1;
  const lastBotMessage = messages.filter((m) => m.sender === "bot").pop();
  const priceMatch = lastBotMessage?.text.match(/dưới (\d+)/i);
  const genderMatch = lastBotMessage?.text.match(/cho (nam|nữ)/i);
  const categoryMatch = lastBotMessage?.text.match(/loại (\w+)/i);

  let queryParams = "";
  if (priceMatch) queryParams += `maxPrice=${priceMatch[1]}`;
  if (genderMatch)
    queryParams += `${queryParams ? "&" : ""}gender=${
      genderMatch[1] === "nam" ? "Nam" : "Nữ"
    }`;
  if (categoryMatch)
    queryParams += `${queryParams ? "&" : ""}mainCategory=${categoryMatch[1]}`;

  if (queryParams) {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/chatbot?${queryParams}&page=${currentPage}&limit=5`
      );
      const { products, total } = response.data;

      if (products.length === 0) {
        return "Không còn sản phẩm nào để hiển thị.";
      }

      let reply = `Các sản phẩm tiếp theo:\n`;
      products.forEach((product, index) => {
        reply += `${index + 1}. ${product.name} - Giá: ${product.price}\n`;
        if (product.image) reply += `Hình ảnh: ${product.image}\n`;
      });
      if (total > currentPage * 5)
        reply += `\nNhập 'xem thêm' để thấy thêm sản phẩm.`;
      return reply;
    } catch (error) {
      return "Có lỗi xảy ra. Vui lòng thử lại!";
    }
  }
  return "Không thể xử lý yêu cầu 'xem thêm'.";
};

// Cập nhật handleSendMessage
const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  setMessages([...messages, { sender: "user", text: input }]);
  setInput("");

  let response;
  if (input.toLowerCase() === "xem thêm") {
    response = await handleSeeMore();
  } else {
    response = await processMessage(input);
  }
  setMessages((prev) => [...prev, { sender: "bot", text: response }]);
};
