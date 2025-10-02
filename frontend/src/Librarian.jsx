import React, { useState } from 'react';
import { Home, Bell, History, Book, Search, BookOpen, Users, Calendar, Plus, Star, X, LogOut } from 'lucide-react';
import { getBooks } from "./api";   

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
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white'
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '24px',
    marginBottom: '40px'
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: '24px 20px',
    borderRadius: '16px',
    border: '2px solid #e5e7eb',
    transition: 'all 0.2s ease',
    textAlign: 'center',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statNumber: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#6366f1',
    marginBottom: '8px',
    lineHeight: '1.2'
  },
  statLabel: {
    fontSize: '14px',
    color: '#6b7280',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: '1.4'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '24px'
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
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
  bookCardHover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px 0 rgba(0, 0, 0, 0.15)'
  },
  bookCover: {
    width: '100%',
    height: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    position: 'relative'
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
    fontWeight: '500'
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
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    gap: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  tableRow: {
    padding: '20px',
    borderBottom: '1px solid #f3f4f6',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
    gap: '16px',
    fontSize: '14px',
    alignItems: 'center'
  },
  statusBadge: {
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
  statusOverdue: {
    backgroundColor: '#fecaca',
    color: '#dc2626'
  },
  // Modal styles
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
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'white'
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
  readButton: {
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
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
  addBookForm: {
    backgroundColor: 'white',
    padding: '32px',
    borderRadius: '16px',
    maxWidth: '500px',
    width: '100%'
  },
  formTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#111827',
    marginBottom: '24px',
    textAlign: 'center'
  },
  formGroup: {
    marginBottom: '20px'
  },
  formLabel: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '8px'
  },
  formInput: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    transition: 'border-color 0.2s ease'
  },
  formInputFocus: {
    borderColor: '#6366f1'
  },
  formTextarea: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    minHeight: '100px',
    transition: 'border-color 0.2s ease'
  },
  formButtons: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px'
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    border: 'none',
    borderRadius: '8px',
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer'
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
  }
};
const Librarian = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [hoveredLogout, setHoveredLogout] = useState(false);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    pages: '',
    rating: 5
  });

  // 🆕 Thêm state cho dữ liệu động
  const [books, setBooks] = useState([]);


  const bookColors = [
    'linear-gradient(135deg, #ff6b9d, #f06292)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    'linear-gradient(135deg, #74b9ff, #0984e3)'
  ];


React.useEffect(() => {
  getBooks()
    .then(res => {
      const data = res.data;

      const mappedBooks = data.map((book, index) => ({
        id: book.id,
        title: book.title,
        author: book.author,
        color: bookColors[index % bookColors.length],
        pages: book.pages || 300,
        rating: book.rating || 4.5,
        reviews: book.reviews || 100,
        status: book.available_copies > 0 ? "available" : "borrowed",
        description: book.description || `Cuốn sách "${book.title}" của ${book.author}.`,
        image: book.image
      }));

      setBooks(mappedBooks);
    })
    .catch(err => {
      console.error("Lỗi khi lấy sách:", err);
    });

}, []);


  const notifications = [
    { id: 1, title: 'Sách quá hạn', desc: '"The Lean Startup" - Người mượn: Nguyễn Văn A', time: '2 giờ trước', type: 'overdue' },
    { id: 2, title: 'Sách được mượn', desc: '"Atomic Habits" - Người mượn: Trần Thị B', time: '5 giờ trước', type: 'borrowed' },
    { id: 3, title: 'Sách quá hạn', desc: '"Deep Work" - Người mượn: Lê Văn C', time: '1 ngày trước', type: 'overdue' }
  ];

  const borrowHistory = [
    { id: 1, bookTitle: 'Tâm lý học đám đông', borrower: 'Nguyễn Văn A', borrowDate: '15/09/2024', returnDate: '22/09/2024', status: 'Đã trả' },
    { id: 2, bookTitle: 'Đắc nhân tâm', borrower: 'Trần Thị B', borrowDate: '10/09/2024', returnDate: '', status: 'Đang mượn' },
    { id: 3, bookTitle: 'Sapiens', borrower: 'Lê Văn C', borrowDate: '05/09/2024', returnDate: '12/09/2024', status: 'Đã trả' },
    { id: 4, bookTitle: 'Atomic Habits', borrower: 'Phạm Thị D', borrowDate: '01/09/2024', returnDate: '', status: 'Quá hạn' }
  ];

  const navItems = [
    { id: 'home', label: 'Trang chủ', icon: Home },
    { id: 'notifications', label: 'Thông báo', icon: Bell },
    { id: 'history', label: 'Lịch sử', icon: History },
    { id: 'add-book', label: 'Thêm sách', icon: Plus }
  ];

  const getStatusStyle = (status) => {
    const baseStyle = styles.statusBadge;
    switch (status) {
      case 'Đã trả': return { ...baseStyle, ...styles.statusAvailable };
      case 'Đang mượn': return { ...baseStyle, ...styles.statusBorrowed };
      case 'Quá hạn': return { ...baseStyle, ...styles.statusOverdue };
      default: return baseStyle;
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleCloseModal = () => {
    setSelectedBook(null);
    setShowAddBookModal(false);
  };

  const handleAddBook = () => {
    setShowAddBookModal(true);
  };

  const handleSubmitBook = (e) => {
    e.preventDefault();
    // Logic thêm sách mới
    console.log('New book:', newBook);
    setShowAddBookModal(false);
    setNewBook({
      title: '',
      author: '',
      description: '',
      pages: '',
      rating: 5
    });
  };

  const  renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index}
        size={20}
        fill={index < Math.floor(rating) ? '#fbbf24' : 'none'}
        color="#fbbf24"
      />
    ));
  };

  const handleLogout = () => {
    // Logic chuyển về trang login
    alert('Chuyển về trang login.jsx');
    // Trong thực tế, bạn sẽ sử dụng router để navigate
    // navigate('/login') hoặc window.location.href = '/login'
  };

  console.log('Active tab:', activeTab); // Debug log

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <h1 style={styles.pageTitle}>Trang chủ</h1>
            
            {/* Statistics Cards */}
            <div style={styles.statsGrid}>
              <div style={styles.statCard}>
                <div style={{...styles.statNumber}}>1,247</div>
                <div style={{...styles.statLabel}}>Tổng số sách</div>
              </div>
              <div style={styles.statCard}>
                <div style={{...styles.statNumber}}>156</div>
                <div style={{...styles.statLabel}}>Sách đã mượn</div>
              </div>
              <div style={styles.statCard}>
                <div style={{...styles.statNumber}}>23</div>
                <div style={{...styles.statLabel}}>Sách quá hạn</div>
              </div>
              <div style={styles.statCard}>
                <div style={{...styles.statNumber}}>89</div>
                <div style={{...styles.statLabel}}>Độc giả hoạt động</div>
              </div>
            </div>

            {/* Popular Books */}
<div style={styles.sectionTitle}>Thư viện sách</div>
<div style={styles.booksGrid}>
  {books.map((book) => (
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
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <BookOpen size={48} color="white" />
        )}
      </div>
      <div style={styles.bookInfo}>
        <div style={styles.bookTitle}>{book.title}</div>
        <div style={styles.bookAuthor}>{book.author}</div>
        <span style={getStatusStyle(book.status)}>
          {book.status === "available" ? "Có sẵn" : "Đang mượn"}
        </span>
      </div>
    </div>
  ))}
</div>

          </>
        );

      case 'notifications':
        return (
          <>
            <h1 style={styles.pageTitle}>Thông báo</h1>
            
            {notifications.map(notification => (
              <div key={notification.id} style={styles.notificationItem}>
                <div style={styles.notificationTitle}>{notification.title}</div>
                <div style={styles.notificationDesc}>{notification.desc}</div>
                <div style={styles.notificationTime}>{notification.time}</div>
              </div>
            ))}
          </>
        );

      case 'history':
        return (
          <>
            <h1 style={styles.pageTitle}>Lịch sử mượn trả sách</h1>
            
            <div style={styles.historyTable}>
              <div style={styles.tableHeader}>
                <div>Tên sách</div>
                <div>Người mượn</div>
                <div>Ngày mượn</div>
                <div>Ngày trả</div>
                <div>Trạng thái</div>
              </div>
              
              {borrowHistory.map(record => (
                <div key={record.id} style={styles.tableRow}>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{record.bookTitle}</div>
                  <div>{record.borrower}</div>
                  <div>{record.borrowDate}</div>
                  <div>{record.returnDate || 'Chưa trả'}</div>
                  <div>
                    <span style={getStatusStyle(record.status)}>
                      {record.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </>
        );

      case 'add-book':
        return (
          <>
            <h1 style={styles.pageTitle}>Thêm sách mới</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <button 
                onClick={handleAddBook}
                style={{
                  backgroundColor: '#6366f1',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '20px 40px',
                  fontSize: '18px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
                }}
              >
                <Plus size={24} />
                Thêm sách mới
              </button>
            </div>
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
        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>
              📚
            </div>
            <span>LibraryMS</span>
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
              />
              <button style={styles.searchButton}>
                <Search size={16} />
              </button>
            </div>
            
            <div style={styles.userProfile}>
              <div style={styles.notificationIcon}>
                <Bell size={24} color="#6b7280" />
                <div style={styles.notificationBadge}>3</div>
              </div>
              <div style={styles.avatar}>NV</div>
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
              <button style={styles.closeButton} onClick={handleCloseModal}>
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
                  <div style={styles.statNumber}>{selectedBook.pages}</div>
                  <div style={styles.statLabel}>Pages</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>{selectedBook.rating}</div>
                  <div style={styles.statLabel}>Rating</div>
                </div>
                <div style={styles.statItem}>
                  <div style={styles.statNumber}>{selectedBook.reviews}</div>
                  <div style={styles.statLabel}>Reviews</div>
                </div>
              </div>
              
              <div style={styles.description}>
                {selectedBook.description}
              </div>
              
              <button style={styles.readButton}>
                <BookOpen size={16} />
                Read Now
              </button>
            </div>
          </div>
        )}

        {/* Add Book Modal */}
        {showAddBookModal && (
          <div style={styles.modalOverlay} onClick={handleCloseModal}>
            <div style={styles.addBookForm} onClick={(e) => e.stopPropagation()}>
              <h2 style={styles.formTitle}>Thêm sách mới</h2>
              <form onSubmit={handleSubmitBook}>
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Tên sách</label>
                  <input
                    type="text"
                    style={styles.formInput}
                    value={newBook.title}
                    onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                    required
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Tác giả</label>
                  <input
                    type="text"
                    style={styles.formInput}
                    value={newBook.author}
                    onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                    required
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Số trang</label>
                  <input
                    type="number"
                    style={styles.formInput}
                    value={newBook.pages}
                    onChange={(e) => setNewBook({...newBook, pages: e.target.value})}
                    required
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.formLabel}>Mô tả</label>
                  <textarea
                    style={styles.formTextarea}
                    value={newBook.description}
                    onChange={(e) => setNewBook({...newBook, description: e.target.value})}
                    placeholder="Nhập mô tả về cuốn sách..."
                    required
                  />
                </div>
                
                <div style={styles.formButtons}>
                  <button type="button" style={styles.cancelButton} onClick={handleCloseModal}>
                    Hủy
                  </button>
                  <button type="submit" style={styles.submitButton}>
                    Thêm sách
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Librarian;