import React, { useState } from 'react';
import { Bell, History, Book, Search, BookOpen, Star, X, LogOut, Trash2, User, Settings, ChevronDown } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { getBooks,createBorrow,getNotificationsByUser,deleteNotification,deleteBorrow } from "./api";

// CSS Modules styles (inline for demonstration)
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    overflow: 'hidden'
  },
  sidebar: {
    width: '280px',
    background: 'linear-gradient(180deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)',
    padding: '24px 20px',
    display: 'flex',
    flexDirection: 'column'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '32px',
    fontSize: '24px',
    fontWeight: '700',
    color: 'white'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '20px'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    flex: 1
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '500'
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    color: 'white',
    fontWeight: '600'
  },
  navItemHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    height: '100vh',
    overflow: 'hidden'
  },
  header: {
    backgroundColor: 'white',
    padding: '20px 32px',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchContainer: {
    position: 'relative',
    width: '400px'
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 20px 12px 50px',
    fontSize: '15px',
    outline: 'none',
    color: '#374151'
  },
  searchIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af'
  },
  searchButton: {
  position: 'absolute',
  right: '8px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: '#6366f1',
  border: 'none',
  borderRadius: '20px',
  padding: '6px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: 'white',
  fontSize: '14px',
  fontWeight: '500'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px'
  },
  notificationIcon: {
    position: 'relative',
    padding: '8px',
    cursor: 'pointer'
  },
  notificationBadge: {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '20px',
    height: '20px',
    backgroundColor: '#ef4444',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: 'white',
    fontWeight: '600'
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600'
  },
  content: {
    flex: 1,
    padding: '32px',
    overflowY: 'auto'
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '32px'
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px'
  },
  bookCard: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer'
  },
  bookCover: {
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px'
  },
  bookInfo: {
    padding: '20px'
  },
  bookTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  bookAuthor: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: '12px'
  },
  bookStatus: {
    padding: '6px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
    textAlign: 'center'
  },
  statusAvailable: {
    backgroundColor: '#dcfce7',
    color: '#16a34a'
  },
  statusBorrowed: {
    backgroundColor: '#fef3c7',
    color: '#d97706'
  },
  notificationItem: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '16px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  notificationTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827',
    marginBottom: '8px'
  },
  notificationDesc: {
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: '8px'
  },
  notificationTime: {
    fontSize: '12px',
    color: '#9ca3af'
  },
  historyTable: {
    backgroundColor: 'white',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  },
  tableHeader: {
    backgroundColor: '#f8fafc',
    padding: '20px',
    borderBottom: '1px solid #e5e7eb',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
    gap: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  tableRow: {
    padding: '20px',
    borderBottom: '1px solid #f3f4f6',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 100px',
    gap: '16px',
    fontSize: '14px',
    alignItems: 'center'
  },
  logoutContainer: {
    marginTop: 'auto',
    paddingTop: '20px',
    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '16px',
    fontWeight: '500',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none'
  },
  logoutButtonHover: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)'
  },
  modal: {
    background: 'linear-gradient(135deg, #1e3a8a, #1e40af)',
    borderRadius: '20px',
    padding: '40px 30px',
    width: '400px',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    color: 'white',
    textAlign: 'center'
  },
closeButton: {
  position: "absolute",
  top: "10px",
  right: "10px",
  background: "transparent", // trong suốt
  border: "none",            // bỏ viền
  cursor: "pointer",         // trỏ chuột
  color: "white",            // màu icon X
  fontSize: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "transform 0.2s ease, color 0.2s ease",
},

  bookCoverModal: {
    width: '160px',
    height: '220px',
    backgroundColor: 'white',
    borderRadius: '12px',
    margin: '0 auto 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
  },
  bookTitleModal: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '8px',
    color: 'white'
  },
  bookAuthorModal: {
    fontSize: '16px',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: '20px'
  },
  ratingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px'
  },
  stars: {
    display: 'flex',
    gap: '4px'
  },
  ratingText: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white'
  },
  statsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '24px',
    gap: '20px'
  },
  statItem: {
    textAlign: 'center',
    flex: 1
  },
  statNumber: {
    fontSize: '24px',
    fontWeight: '700',
    color: 'white',
    marginBottom: '4px'
  },
  statLabel: {
    fontSize: '12px',
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  },
  description: {
    fontSize: '14px',
    lineHeight: '1.6',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '32px',
    textAlign: 'left'
  },
  borrowButton: {
    background: 'linear-gradient(135deg, #16a34a, #15803d)',
    border: 'none',
    borderRadius: '50px',
    padding: '12px 32px',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    margin: '0 auto',
    transition: 'transform 0.2s ease'
  },
deleteButton: {
  backgroundColor: 'transparent',      // mặc định trong suốt
  border: '2px solid #ef4444',         // viền đỏ
  borderRadius: '6px',                 // bo góc vuông nhẹ
  padding: '6px 12px',                 // padding rộng để chứa chữ
  display: 'flex',
  alignItems: 'center',
  gap: '6px',                          // khoảng cách icon và chữ
  cursor: 'pointer',
  color: '#ef4444',                    // màu chữ + icon
  fontSize: '14px',
  fontWeight: '500',
  transition: 'all 0.2s ease'
},
deleteButtonHover: {
  backgroundColor: '#ef4444',          // hover: nền đỏ
  color: 'white',                      // chữ + icon thành trắng
  transform: 'scale(1.05)',
  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
},

  profileDropdown: {
    position: 'relative'
  },
  avatarContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '12px',
    transition: 'background-color 0.2s ease'
  },
  avatarContainerHover: {
    backgroundColor: '#f3f4f6'
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '8px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    border: '1px solid #e5e7eb',
    padding: '8px',
    minWidth: '200px',
    zIndex: 1000
  },
  dropdownItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    fontSize: '14px',
    color: '#374151'
  },
  dropdownItemHover: {
    backgroundColor: '#f3f4f6'
  },
  dropdownDivider: {
    height: '1px',
    backgroundColor: '#e5e7eb',
    margin: '8px 0'
  },
  profileInfo: {
    padding: '12px 16px',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '8px'
  },
  profileName: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#111827'
  },
  profileEmail: {
    fontSize: '14px',
    color: '#6b7280'
  }
};

const UserLibrary = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [books, setBooks] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [borrowHistory, setBorrowHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [hoveredDeleteButton, setHoveredDeleteButton] = useState(null);
  const navigate = useNavigate();
  const bookColors = [
    'linear-gradient(135deg, #ff6b9d, #f06292)',
    'linear-gradient(135deg, #667eea, #764ba2)', 
    'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    'linear-gradient(135deg, #74b9ff, #0984e3)',
    'linear-gradient(135deg, #fd79a8, #e84393)',
    'linear-gradient(135deg, #fdcb6e, #e17055)'
  ];

  // Initialize data on component mount
React.useEffect(() => {
   const currentUser = JSON.parse(localStorage.getItem("user"));
  if (!currentUser) {
    alert("Chưa đăng nhập!");
    return;
  }
  // --- Lấy sách ---
  getBooks()
    .then(res => {
      const data = res.data;
      const mappedBooks = data.map((book, index) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        color: bookColors[index % bookColors.length],
        available_copies: book.available_copies,
        status: book.available_copies > 0 ? "available" : "borrowed",
        description: `Cuốn sách "${book.title}" của ${book.author}.`,
        image: book.image
      }));
      setBooks(mappedBooks);
    })
    .catch(err => console.error("❌ Lỗi khi lấy sách:", err));

getNotificationsByUser(currentUser.id)
    .then(res => {
      const rawData = res.data;
      const notificationsData = rawData.map(n => ({
        id: n.id,
        title: "Thông báo mượn sách",
        desc: n.message || "Không có nội dung",
        time: new Date(n.created_at).toLocaleString("vi-VN"),
      }));
      setNotifications(notificationsData);

      // --- Sinh lịch sử mượn ---
      const historyData = rawData.map(item => {
        let status = "Khác";
        if (item.message.includes("mượn sách")) status = "Đang mượn";
        if (item.message.includes("trả sách")) status = "Đã trả";

        const bookTitleMatch = item.message.match(/'(.*?)'/);
        const bookTitle = bookTitleMatch ? bookTitleMatch[1] : "Không rõ";

        const borrowDate = new Date(item.created_at);
        borrowDate.setHours(borrowDate.getHours() + 7);
        const dueDate = new Date(borrowDate);
        dueDate.setDate(borrowDate.getDate() + 15);

        return {
          id: item.id,
          bookTitle,
          borrowDate: borrowDate.toLocaleString("vi-VN"),
          dueDate: dueDate.toLocaleDateString("vi-VN"),
          status,
        };
      });
      setBorrowHistory(historyData);
    })
    .catch(err => console.error("❌ Lỗi khi lấy thông báo user:", err));

}, []);




  const navItems = [
    { id: 'books', label: 'Thư viện sách', icon: Book },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'history', label: 'Lịch sử mượn trả', icon: History }
  ];

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
  };

  const handleLogout = () => {
    // Xóa token/session nếu có
    localStorage.removeItem("token");

    // Chuyển hướng về trang đăng nhập
    navigate("/");
  }

  const handleSearch = () => {
    // Logic tìm kiếm sẽ được thực hiện thông qua filteredBooks
  };


const handleDeleteNotification = async (notificationId) => {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  if (!currentUser) {
    alert("Không xác định người dùng, vui lòng đăng nhập lại!");
    return;
  }

  // ✅ Hỏi xác nhận trước khi xóa
  if (!window.confirm("Bạn có chắc muốn xóa thông báo này không?")) return;

  try {
    // 🟢 Gọi API backend để xóa
    await deleteNotification(notificationId);
    console.log(`🗑️ Đã xóa thông báo ID: ${notificationId}`);

    // 🟢 Sau khi xóa, gọi lại danh sách thông báo mới
    const res = await getNotificationsByUser(currentUser.id);
    const rawData = res.data;

    // 🧩 Cập nhật lại state frontend
    const notificationsData = rawData.map(n => ({
      id: n.id,
      title: "Thông báo mượn sách",
      desc: n.message || "Không có nội dung",
      time: new Date(n.created_at).toLocaleString("vi-VN"),
    }));
    setNotifications(notificationsData);

    alert("✅ Xóa thông báo thành công!");
  } catch (err) {
    console.error("❌ Lỗi khi xóa thông báo:", err);
    const detail = err.response?.data?.detail || "Không thể xóa thông báo.";
    alert(detail);
  }
};

  const handleDeleteHistory = async (historyId) => {
  if (!window.confirm("Bạn có chắc muốn xóa lịch sử này không?")) return;
  try {
    await deleteNotification(historyId); // 👈 đổi từ deleteBorrow → deleteNotification
    setBorrowHistory(prev => prev.filter(h => h.id !== historyId));
    alert("✅ Xóa lịch sử thành công!");
  } catch (err) {
    console.error("❌ Lỗi khi xóa lịch sử:", err);
    alert("Không thể xóa lịch sử!");
  }
};


  const handleProfileClick = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleProfileAction = (action) => {
    setShowProfileDropdown(false);
    switch(action) {
      case 'profile':
        alert('Chuyển đến trang Profile - user-profile.jsx');
        // window.location.href = '/profile' hoặc navigate('/profile')
        break;
      case 'settings':
        alert('Chuyển đến trang cài đặt');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

const handleBorrowBook = async () => {
  try {
    if (!selectedBook) {
      alert("Vui lòng chọn một cuốn sách để mượn!");
      return;
    }

    console.log("🚀 === BẮT ĐẦU MƯỢN SÁCH ===");

    const currentUser = JSON.parse(localStorage.getItem("user"));
    console.log("📚 Mượn sách:", selectedBook);
    console.log("👤 User:", currentUser);

    // 🟢 CHUẨN BỊ DATA - LOG CHI TIẾT
    const borrowData = {
      member_id: currentUser.id,
      book_id: selectedBook.id,
      borrowed_at: new Date().toISOString(),
    };

    console.log("📤 DATA GỬI LÊN API:", borrowData);
    console.log("🔍 KIỂU DỮ LIỆU:", {
      member_id: { value: borrowData.member_id, type: typeof borrowData.member_id },
      book_id: { value: borrowData.book_id, type: typeof borrowData.book_id },
      borrowed_at: { value: borrowData.borrowed_at, type: typeof borrowData.borrowed_at }
    });

    // 🟢 GỬI REQUEST
    console.log("🔄 ĐANG GỬI REQUEST...");
    const response = await createBorrow(borrowData);
    console.log("✅ THÀNH CÔNG:", response.data);

    // 🟢 RELOAD DATA
    console.log("🔄 ĐANG TẢI LẠI DANH SÁCH SÁCH...");
    const res = await getBooks();
    const updatedBook = res.data.find(b => b.id === selectedBook.id);
    console.log("📊 SÁCH SAU KHI MƯỢN:", updatedBook);

    // Cập nhật state
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === updatedBook.id
          ? { 
              ...book, 
              available_copies: updatedBook.available_copies,
              status: updatedBook.available_copies > 0 ? "available" : "borrowed"
            }
          : book
      )
    );

    setSelectedBook({
      ...selectedBook,
      available_copies: updatedBook.available_copies,
      status: updatedBook.available_copies > 0 ? "available" : "borrowed"
    });

    console.log("🎉 MƯỢN SÁCH THÀNH CÔNG!");
    alert(`Đã mượn sách "${selectedBook.title}" thành công!`);
// 🟢 Gọi lại API để cập nhật thông báo và lịch sử ngay
try {
  const res = await getNotificationsByUser(currentUser.id);
  const rawData = res.data;

  // 🧩 Cập nhật danh sách thông báo
  const notificationsData = rawData.map(n => ({
    id: n.id,
    title: "Thông báo mượn sách",
    desc: n.message || "Không có nội dung",
    time: new Date(n.created_at).toLocaleString("vi-VN"),
  }));
  setNotifications(notificationsData);

  // 🧩 Cập nhật danh sách lịch sử mượn (hạn trả = +15 ngày)
  const historyData = rawData.map(item => {
    const borrowDate = new Date(item.created_at);
    borrowDate.setHours(borrowDate.getHours() + 7); // 🇻🇳 Chuyển sang giờ Việt Nam
    const dueDate = new Date(borrowDate);
    dueDate.setDate(borrowDate.getDate() + 15);

    return {
      id: item.id,
      bookTitle: item.message.match(/'(.*?)'/)?.[1] || "Không rõ tên sách",
      borrowDate: borrowDate.toLocaleString("vi-VN"),
      dueDate: dueDate.toLocaleDateString("vi-VN"),
      status: item.message.includes("mượn sách") ? "Đang mượn" : "Đã trả",
    };
  });
  setBorrowHistory(historyData);

  console.log("🔄 Đã cập nhật lại thông báo & lịch sử!");
} catch (error) {
  console.error("❌ Lỗi khi cập nhật thông báo/lịch sử:", error);
}

  } catch (error) {
    console.error("💥 === LỖI CHI TIẾT ===");
    console.error("📊 STATUS CODE:", error.response?.status);
    console.error("📝 RESPONSE DATA:", error.response?.data); // 👈 QUAN TRỌNG NHẤT
    console.error("🚨 ERROR MESSAGE:", error.message);
    console.error("🔧 ERROR CONFIG:", {
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data
    });

    // Hiển thị thông báo lỗi chi tiết
    const errorDetail = error.response?.data?.detail;
    console.error("📢 CHI TIẾT LỖI:", errorDetail);
    
    alert(errorDetail || "Không thể mượn sách. Vui lòng thử lại!");
  }
};


  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        size={20}
        fill={index < Math.floor(rating) ? '#fbbf24' : 'none'}
        color="#fbbf24"
      />
    ));
  };

  const getStatusStyle = (status) => {
    const baseStyle = styles.bookStatus;
    switch (status) {
      case 'available': return { ...baseStyle, ...styles.statusAvailable };
      case 'borrowed': return { ...baseStyle, ...styles.statusBorrowed };
      default: return baseStyle;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Có sẵn';
      case 'borrowed': return 'Đã mượn';
      default: return status;
    }
  };

  // Lọc sách theo từ khóa tìm kiếm
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return (
          <>
            <h1 style={styles.pageTitle}>Thư viện sách</h1>
            {searchTerm && (
              <div style={{ marginBottom: '24px', fontSize: '16px', color: '#6b7280' }}>
                Kết quả tìm kiếm cho: "<strong>{searchTerm}</strong>" ({filteredBooks.length} kết quả)
              </div>
            )}
  <div style={styles.booksGrid}>
  {filteredBooks.map((book) => (
    <div 
      key={book.id} 
      style={styles.bookCard}
      onClick={() => handleBookClick(book)}
    >
      <div style={{
        ...styles.bookCover,
        background: book.color
      }}>
        {book.image ? (
          <img
            src={`http://localhost:8001/image/${book.image}`} 
            alt={book.title}
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover" 
            }}
          />
        ) : (
          <BookOpen size={48} color="white" />
        )}
      </div>
      <div style={styles.bookInfo}>
        <div style={styles.bookTitle}>{book.title}</div>
        <div style={styles.bookAuthor}>{book.author}</div>
        <span style={getStatusStyle(book.status)}>
          {getStatusText(book.status)}
        </span>
      </div>
    </div>
  ))}
</div>

            {filteredBooks.length === 0 && searchTerm && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6b7280',
                fontSize: '16px'
              }}>
                <Search size={48} color="#d1d5db" />
                <div style={{ marginTop: '16px' }}>Không tìm thấy sách nào phù hợp</div>
              </div>
            )}
          </>
        );

      case 'notifications':
        return (
          <>
            <h1 style={styles.pageTitle}>Thông báo</h1>
            {notifications.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6b7280',
                fontSize: '16px'
              }}>
                <Bell size={48} color="#d1d5db" />
                <div style={{ marginTop: '16px' }}>Chưa có thông báo nào</div>
              </div>
            ) : (
              notifications.map(notification => (
                <div key={notification.id} style={{
                  ...styles.notificationItem,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={styles.notificationTitle}>{notification.title}</div>
                    <div style={styles.notificationDesc}>{notification.desc}</div>
                    <div style={styles.notificationTime}>{notification.time}</div>
                  </div>
                  <button
                    style={{
                      ...styles.deleteButton,
                      ...(hoveredDeleteButton === notification.id ? styles.deleteButtonHover : {})
                    }}
                    onClick={() => handleDeleteNotification(notification.id)}
                    onMouseEnter={() => setHoveredDeleteButton(notification.id)}
                    onMouseLeave={() => setHoveredDeleteButton(null)}
                    title="Xóa thông báo"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </>
        );

      case 'history':
        return (
          <>
            <h1 style={styles.pageTitle}>Lịch sử mượn trả sách</h1>
            {borrowHistory.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: '#6b7280',
                fontSize: '16px'
              }}>
                <History size={48} color="#d1d5db" />
                <div style={{ marginTop: '16px' }}>Chưa có lịch sử mượn sách</div>
              </div>
            ) : (
              <div style={styles.historyTable}>
                <div style={styles.tableHeader}>
                  <div>Tên sách</div>
                  <div>Ngày mượn</div>
                  <div>Hạn trả</div>
                  <div>Trạng thái</div>
                  <div>Thao tác</div>
                </div>
                
                {borrowHistory.map(record => (
                  <div key={record.id} style={styles.tableRow}>
                    <div style={{ fontWeight: '600', color: '#111827' }}>{record.bookTitle}</div>
                    <div>{record.borrowDate}</div>
                    <div>{record.dueDate}</div>
                    <div>
                      <span style={getStatusStyle(record.status === 'Đã trả' ? 'available' : 'borrowed')}>
                        {record.status}
                      </span>
                    </div>
                    <div>
                      <button
                        style={{
                          ...styles.deleteButton,
                          ...(hoveredDeleteButton === record.id ? styles.deleteButtonHover : {})
                        }}
                        onClick={() => handleDeleteHistory(record.id)}
                        onMouseEnter={() => setHoveredDeleteButton(record.id)}
                        onMouseLeave={() => setHoveredDeleteButton(null)}
                        title="Xóa lịch sử"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{
      margin: 0,
      padding: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <div style={styles.container}>
        {/* Click outside to close dropdown */}
        {showProfileDropdown && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setShowProfileDropdown(false)}
          />
        )}
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              📚
            </div>
            <span>LibraryUser</span>
          </div>
          
          <nav style={styles.nav}>
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isHovered = hoveredNavItem === item.id;
              
              return (
                <div
                  key={item.id}
                  style={{
                    ...styles.navItem,
                    ...(isActive ? styles.navItemActive : {}),
                    ...(isHovered && !isActive ? styles.navItemHover : {})
                  }}
                  onClick={() => setActiveTab(item.id)}
                  onMouseEnter={() => setHoveredNavItem(item.id)}
                  onMouseLeave={() => setHoveredNavItem(null)}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </nav>

          {/* Logout Button */}
          <div style={styles.logoutContainer}>
            <button
              style={{
                ...styles.logoutButton,
                ...(hoveredLogout ? styles.logoutButtonHover : {})
              }}
              onClick={handleLogout}
              onMouseEnter={() => setHoveredLogout(true)}
              onMouseLeave={() => setHoveredLogout(false)}
            >
              <LogOut size={20} />
              <span>Đăng xuất</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.main}>
          {/* Header */}
          <header style={styles.header}>
            <div style={styles.searchContainer}>
              <Search size={20} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Tìm kiếm sách, tác giả..."
                style={styles.searchBar}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button style={styles.searchButton} onClick={handleSearch}>
                <Search size={16} />
              </button>
            </div>
            
                      <div style={styles.userProfile}>
          <div style={styles.notificationIcon}>
            <Bell size={24} color="#6b7280" />
            {notifications.length > 0 && (
              <div style={styles.notificationBadge}>
                {notifications.length}
              </div>
            )}
          </div>

              <div style={styles.avatar}>A</div>
            </div>
          </header>

          {/* Content */}
          <main style={styles.content}>
            {renderContent()}
          </main>
        </div>

        {/* Book Detail Modal */}
        {selectedBook && (
          <div style={styles.modalOverlay} onClick={handleCloseModal}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
              <button
                style={styles.closeButton}
                onClick={handleCloseModal}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#ff4d4f")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
              >
              <X size={20} />
              </button>
              
              <div style={styles.bookCoverModal}>
                <div style={{ 
                  color: '#6b7280', 
                  fontSize: '16px', 
                  fontWeight: '600',
                  textAlign: 'center',
                  lineHeight: '1.3'
                }}>
                  {selectedBook.title}
                </div>
                <div style={{ color: '#ef4444', fontSize: '24px', margin: '15px 0' }}>
                  ❤️
                </div>
                <div style={{ 
                  color: '#374151', 
                  fontSize: '14px', 
                  fontWeight: '500',
                  textAlign: 'center'
                }}>
                  {selectedBook.author}
                </div>
              </div>
              
              <div style={styles.bookTitleModal}>{selectedBook.title}</div>
              <div style={styles.bookAuthorModal}>{selectedBook.author}</div>
              
              <div style={styles.ratingContainer}>
                <div style={styles.stars}>
                  {renderStars(selectedBook.rating)}
                </div>
                <span style={styles.ratingText}>{selectedBook.rating}</span>
              </div>
              
              <div style={styles.statsContainer}>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>
                    {selectedBook.available_copies ?? "—"}
                  </div>
                  <div style={styles.statLabel}>SỐ LƯỢNG</div>
                </div>
              </div>

              <div style={styles.description}>
                {selectedBook.description}
              </div>
              
              {selectedBook.status === 'available' ? (
                <button style={styles.borrowButton} onClick={handleBorrowBook}>
                  <BookOpen size={16} />
                  Mượn sách
                </button>
              ) : (
                <button style={{
                  ...styles.borrowButton,
                  backgroundColor: '#6b7280',
                  cursor: 'not-allowed'
                }} disabled>
                  <BookOpen size={16} />
                  Đã được mượn
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserLibrary;