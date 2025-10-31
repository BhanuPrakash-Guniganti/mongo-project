# Create
db.users.insertOne({ name: "John", age: 25 })
db.users.insertMany([{ name: "Alice" }, { name: "Bob" }])

# Read
db.users.find()                         # All
db.users.find({ age: { $gt: 20 } })     # Filter
db.users.find({}, { name: 1, _id: 0 })  # Projection

# Update
db.users.updateOne({ name: "John" }, { $set: { age: 26 } })
db.users.updateMany({}, { $inc: { age: 1 } })

# Delete
db.users.deleteOne({ name: "Bob" })
db.users.deleteMany({ age: { $lt: 18 } })
