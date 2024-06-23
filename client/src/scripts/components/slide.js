// Cool slider class that allows you to drag the slider to scroll through the content
class Slider {
    constructor(elementId) {
        this.slider = document.getElementById(elementId);

        this.isDown = false;
        this.startX = 0;
        this.scrollLeft = 0;

        this.init();
    }

    init() {
        this.slider.addEventListener('mousedown', this.onMouseDown.bind(this));
        this.slider.addEventListener('mouseleave', this.onMouseLeave.bind(this));
        this.slider.addEventListener('mouseup', this.onMouseUp.bind(this));
        this.slider.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseDown(e) {
        this.isDown = true;
        this.startX = e.pageX - this.slider.offsetLeft;
        this.scrollLeft = this.slider.scrollLeft;
    }

    onMouseLeave() {
        this.isDown = false;
    }

    onMouseUp() {
        this.isDown = false;
    }

    onMouseMove(e) {
        if (!this.isDown) return;
        e.preventDefault();
        const x = e.pageX - this.slider.offsetLeft;
        const walk = x - this.startX;
        this.slider.scrollLeft = this.scrollLeft - walk;
    }

    static init(elementId) {
        return new Slider(elementId);
    }
}

export default Slider;