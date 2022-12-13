const router = require('express').Router()
const Note = require('../models/Note')

router.get('/', async(req, res) => {
    try {
        const note = await Note.find()
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async(req, res) => {

    const id = req.params.id

    try {
        const note = await Note.findById({ _id: id })

        if (!note) {
            res.status(404).json({ message: 'Note not found' })
            return
        }
        res.status(200).json(note)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.post('/', async(req, res) => {

    const { title, noteText, subject } = req.body

    const createDate = Date.now()
    const updateDate = Date.now()

    const note = {
        title,
        noteText,
        subject,
        createDate,
        updateDate
    }

    if (!title) {
        res.status(422).json({ error: 'Title is required' })
        return
    }

    try {
        await Note.create(note)
        res.status(201).json({ message: 'Note created successfully!' })

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.patch('/:id', async(req, res) => {

    const id = req.params.id

    const { title, noteText, subject } = req.body

    const updateDate = Date.now()

    const note = {
        title,
        noteText,
        subject,
        updateDate
    }

    try {

        const updatedNote = await Note.updateOne({ _id: id }, note)

        if (updatedNote.matchedCount === 0) {
            res.status(404).json({ message: 'Note not found' })
            return
        }

        res.status(200).json(note)

    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const note = await Note.findById({ _id: id })

    if (!note) {
        res.status(404).json({ message: 'Note not found' })
        return
    }
    try {
        await Note.deleteOne({ _id: id })
        res.status(200).json({ message: 'Note removed successfully' })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

module.exports = router