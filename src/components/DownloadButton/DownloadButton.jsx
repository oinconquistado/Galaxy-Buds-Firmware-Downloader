const DownloadButton = ({ link, disabled, firmwareSelected }) => {
  return (
    <button
      class='grid place-items-center bg-malibu-500 cursor-pointer h-12 mt-8 text-malibu-50 '
      alt={link}
      disabled={disabled}
      onClick={() => {
        window.open(link);
      }}
    >
      Download: {firmwareSelected}
    </button>
  );
};

export default DownloadButton;
