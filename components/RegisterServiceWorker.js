export default () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          navigator.serviceWorker.register('/sw.js');
        });
      }`
    }}
  />
)
