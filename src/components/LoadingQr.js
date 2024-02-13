import { BsQrCodeScan } from "react-icons/bs";

const LoadingQr = () => {
  return (
    <div
      aria-label="Loading..."
      role="status"
      className="flex items-center space-x-2"
    >
      <BsQrCodeScan size={40} />
      <span className="text-4xl font-medium text-gray-500">Scan Qr...</span>
    </div>
  );
};
export default LoadingQr;
