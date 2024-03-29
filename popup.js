let popupLerpSpeed = 0.2

function Popup(id) {
    this.x = width / 2
    this.y = height / 2
    let startingW = width * 9 / 15
    let startingH = height * 9 / 15
    this.w = startingW
    this.h = startingH
    let targetW = width * 9 / 10
    let targetH = height * 9 / 10
    this.oppacity = 0
    this.closing = false
    this.closingStartFrame
    this.openingStartFrame = frameCount
    this.opening = true

    this.show = function () {
        colorMode(RGB)
        fill(20, this.oppacity)
        rect(this.x, this.y, this.w, this.h, this.w / 25)
        if (this.closing) {
            this.w = lerp(this.w, startingW, popupLerpSpeed)
            this.h = lerp(this.h, startingH, popupLerpSpeed)
            this.oppacity = lerp(this.oppacity, 0, popupLerpSpeed)
            if (frameCount - this.closingStartFrame > popupLerpSpeed * 60) {
                popup = undefined
            }
        } else {
            this.w = lerp(this.w, targetW, popupLerpSpeed)
            this.h = lerp(this.h, targetH, popupLerpSpeed)
            this.oppacity = lerp(this.oppacity, 200, popupLerpSpeed)
        }

        if (this.opening && frameCount - this.openingStartFrame > popupLerpSpeed * 60) {
            this.opening = false
        }

        let tx
        switch (id) {
            case "tutorial":
                tx = "• swipe or use arrow keys to shift every tile\n\n• composite numbers combine with the same number tile\n\n• prime numbers combine with any number\n\n• each move spawns a tile on the opposite side\n\n• don't let the board fill up!\n\n\n\nclick anywhere to play\n\nMade by Eric Xie"
                console.log(tx)
                break
        }
        fill(255, this.oppacity * 2)
        textSize(this.w / 40)
        textWrap(WORD)
        textAlign(CENTER, TOP)
        text(tx, this.x, this.y - this.h / 2.5, this.w)
    }

    this.onClick = function () {
        if (this.opening) return
        switch (id) {
            case "tutorial":
                if (!this.closing) {
                    this.closingStartFrame = frameCount
                }
                this.closing = true
                break
        }
    }
}