import React, { useState } from 'react';
import { Bell, History, Book, Search, BookOpen, Star, X, LogOut } from 'lucide-react';

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
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
    gap: '16px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#374151'
  },
  tableRow: {
    padding: '20px',
    borderBottom: '1px solid #f3f4f6',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1fr',
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
  }
};

const UserLibrary = () => {
  const [activeTab, setActiveTab] = useState('books');
  const [hoveredNavItem, setHoveredNavItem] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [hoveredLogout, setHoveredLogout] = useState(false);

  const bookColors = [
    'linear-gradient(135deg, #ff6b9d, #f06292)',
    'linear-gradient(135deg, #667eea, #764ba2)', 
    'linear-gradient(135deg, #ffeaa7, #fab1a0)',
    'linear-gradient(135deg, #74b9ff, #0984e3)',
    'linear-gradient(135deg, #fd79a8, #e84393)',
    'linear-gradient(135deg, #fdcb6e, #e17055)'
  ];

  const availableBooks = [
    { 
      id: 1, 
      title: 'Tâm lý học đám đông', 
      author: 'Gustave Le Bon', 
      color: bookColors[0],
      pages: 320,
      rating: 4.5,
      reviews: 845,
      status: 'available',
      description: 'Cuốn sách này khám phá tâm lý của đám đông và cách thức họ hành xử khác biệt so với cá nhân.'
    },
    { 
      id: 2, 
      title: 'Đắc nhân tâm', 
      author: 'Dale Carnegie', 
      color: bookColors[1],
      pages: 320,
      rating: 4.8,
      reviews: 1205,
      status: 'available',
      description: 'Một trong những cuốn sách kinh điển về kỹ năng giao tiếp và ứng xử.'
    },
    { 
      id: 3, 
      title: 'Sapiens', 
      author: 'Yuval Noah Harari', 
      color: bookColors[2],
      pages: 512,
      rating: 4.7,
      reviews: 967,
      status: 'borrowed',
      description: 'Cuốn sách khám phá lịch sử loài người từ thời tiền sử đến hiện đại.'
    },
    { 
      id: 4, 
      title: 'Atomic Habits', 
      author: 'James Clear', 
      color: bookColors[3],
      pages: 285,
      rating: 4.9,
      reviews: 1456,
      status: 'available',
      description: 'Hệ thống thực tế để xây dựng thói quen tốt và loại bỏ thói quen xấu.'
    },
    { 
      id: 5, 
      title: 'Think and Grow Rich', 
      author: 'Napoleon Hill', 
      color: bookColors[4],
      pages: 400,
      rating: 4.6,
      reviews: 2340,
      status: 'available',
      description: 'Cuốn sách kinh điển về thành công và làm giàu, dựa trên nghiên cứu 20 năm.'
    },
    { 
      id: 6, 
      title: 'The 7 Habits', 
      author: 'Stephen Covey', 
      color: bookColors[5],
      pages: 380,
      rating: 4.7,
      reviews: 1876,
      status: 'available',
      description: '7 thói quen của những người hiệu quả cao, phát triển tính cách và nguyên tắc.'
    }
  ];

  const notifications = [
    { id: 1, title: 'Sách sắp hết hạn', desc: '"Sapiens" - Hạn trả: 25/09/2024', time: '1 ngày trước' },
    { id: 2, title: 'Có sách mới', desc: '"The Psychology of Money" đã có sẵn', time: '2 ngày trước' },
    { id: 3, title: 'Thông báo hệ thống', desc: 'Thư viện sẽ đóng cửa vào ngày 30/09', time: '3 ngày trước' }
  ];

  const borrowHistory = [
    { id: 1, bookTitle: 'Sapiens', borrowDate: '10/09/2024', dueDate: '25/09/2024', status: 'Đang mượn' },
    { id: 2, bookTitle: 'Tâm lý học đám đông', borrowDate: '28/08/2024', dueDate: '12/09/2024', status: 'Đã trả' },
    { id: 3, bookTitle: 'Đắc nhân tâm', borrowDate: '15/08/2024', dueDate: '30/08/2024', status: 'Đã trả' },
    { id: 4, bookTitle: 'Atomic Habits', borrowDate: '01/08/2024', dueDate: '16/08/2024', status: 'Đã trả' }
  ];

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
    alert('Chuyển về trang login.jsx');
  };

  const handleBorrowBook = () => {
    alert(`Mượn sách "${selectedBook.title}" thành công!`);
    setSelectedBook(null);
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

  const renderContent = () => {
    switch (activeTab) {
      case 'books':
        return (
          <>
            <h1 style={styles.pageTitle}>Thư viện sách</h1>
            <div style={styles.booksGrid}>
              {availableBooks.map((book) => (
                <div 
                  key={book.id} 
                  style={styles.bookCard}
                  onClick={() => handleBookClick(book)}
                >
                  <div style={{
                    ...styles.bookCover,
                    background: book.color
                  }}>
                    <BookOpen size={48} color="white" />
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
                <div>Ngày mượn</div>
                <div>Hạn trả</div>
                <div>Trạng thái</div>
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
                </div>
              ))}
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
              <div style={styles.avatar}>US</div>
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