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


# 🗄️ MongoDB — Complete README (All-in-One)

MongoDB is a **NoSQL**, **document-oriented** database that stores data in **BSON (Binary JSON)** format.  
It’s schema-less, fast, and ideal for modern scalable applications.

---

## ⚙️ Setup & Basics
```bash
show dbs                      # Show all databases
use myDB                      # Switch/create DB
db                            # Show current DB
db.dropDatabase()             # Delete current DB

show collections              # List collections
db.createCollection("users")  # Create collection
db.users.drop()               # Drop collection
