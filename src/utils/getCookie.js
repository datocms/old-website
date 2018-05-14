export default function getCookie(name) {
  if (typeof document !== 'undefined') {
    const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
    if (match) return match[1];
  }
}
