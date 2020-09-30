export function mount(element) {
    const bucket = document.getElementById('kibiras');
    bucket.innerHTML = '';
    bucket.append(element);
}
