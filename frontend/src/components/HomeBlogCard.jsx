const HomeBlogCard = ({ post }) => {
  const imageUrl = post.imagelink
    ? post.imagelink
    : "https://via.placeholder.com/150";
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt="image" className="w-full h-48 object-cover" />
      <div className="p-4">
        <p className="text-sm text-gray-400">{post.authorName}</p>
        <h2 className="text-lg font-bold text-gray-900">{post.title}</h2>
      </div>
    </div>
  );
};
export default HomeBlogCard;
