db.users.insertMany([
    {
        "_id": ObjectId('6983520fc0ddee2551cb0ce2'),
        "email": "Rabe@gmail.com",
        "password": "$2b$10$Vx64tQpGCEcFgIkwGdvwy.Ebiy06ds/aGVmiixvCX54lGNw.YJE86",
        "name": "Rabe",
        "role": {
            "code": "CUSTOMER",
            "label": "Customer"
        },
        "favorites": [],
        "notifications": []
    },
    {
        "_id": ObjectId('6983520fc0ddee2551cb0ce3'),
        "email": "Admin@gmail.com",
        "password": "$2b$10$Vx64tQpGCEcFgIkwGdvwy.Ebiy06ds/aGVmiixvCX54lGNw.YJE86",
        "name": "Admin",
        "role": {
            "code": "ADMIN",
            "label": "Admin"
        },
        "favorites": [],
        "notifications": []
    }
]);

db.rooms.insertMany([
    {
        "_id": ObjectId('698c97f6d0bdcba2131f0c99'),
        "name": 'Box 1',
        "rentPrice": 135000,
        "status": {
            "code": 'AVAILABLE',
            "label": 'Disponible',
            "_id": ObjectId('698c97f6d0bdcba2131f0c96')
        },
        "floor": 1,
        "capacity": 25,
        "dimensions": {
            "length": 10,
            "height": 3,
            "width": 5,
            "area": 50,
            "_id": ObjectId('698c97f6d0bdcba2131f0c97')
        },
        "deletedAt": null,
        "__v": 0
    },
    {
        "_id": ObjectId('698c9820d0bdcba2131f0ca0'),
        "name": 'Box 2',
        "rentPrice": 250000,
        "status": {
            "code": 'AVAILABLE',
            "label": 'Disponible',
            "_id": ObjectId('698c9ff92e3ae09562191633')
        },
        "floor": 1,
        "capacity": 40,
        "dimensions": {
            "length": 15,
            "height": 3,
            "width": 10,
            "area": 150,
            "_id": ObjectId('698c9820d0bdcba2131f0c9e')
        },
        "deletedAt": null,
        "__v": 0
    }
]);

db.users.insertOne({
    "_id": ObjectId('698c5124a4c7623a67cb0ce2'),
    "email": "Rakoto@gmail.com",
    "password": "$2b$10$Vx64tQpGCEcFgIkwGdvwy.Ebiy06ds/aGVmiixvCX54lGNw.YJE86",
    "name": "Boutique",
    "role": {
        "code": "BOUTIQUE",
        "label": "Boutique"
    },
    "favorites": [],
    "notifications": []
});

db.shops.insertMany([
    {
        "_id": ObjectId('698c5222a4c7623a67cb0ce3'),
        "name": "Zara",
        "userId": ObjectId("698c5124a4c7623a67cb0ce2"),
        "category": {
            "code": "MODE",
            "label": "Mode"
        },
        "status": {
            "code": "AVAILABLE",
            "label": "Disponible"
        },
        "roomHistory": [
            {
                "roomId": "room123",
                "from": "2025-06-01",
                "to": "2025-12-31"
            },
            {
                "roomId": "room789",
                "from": "2026-01-01",
                "to": null
            }
        ],
        "photos": [
            {
                "_id": "photo1",
                "url": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
                "createdAt": "2026-01-10",
                "type": {
                    "code": "EXTERIOR",
                    "label": "Exterior"
                }
            },
            {
                "_id": "photo2",
                "url": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
                "createdAt": "2026-01-12",
                "type": {
                    "code": "INTERIOR",
                    "label": "Interior"
                }
            }
        ]
    }
]);

db.requestsReservation.insertMany([
    {
        "shopId": ObjectId("698c5222a4c7623a67cb0ce3"),
        "roomId": ObjectId('698c9820d0bdcba2131f0ca0'),
        "beginingDate": ISODate("2026-02-15T00:00:00"),
        "endingDate": ISODate("2026-05-15T00:00:00"),
        "validated": null,
    }
]);

db.events.insertMany([
    {
        "_id": ObjectId('698ef6c131fd509f68cb0ce2'),
        "title": "Soldes d’hiver",
        "shopId": ObjectId("698c5222a4c7623a67cb0ce3"),
        "startDate": ISODate("2026-02-07"),
        "endDate": ISODate("2026-02-13"),
        "description": "Text",
        "createdAt": "2026-01-31",
        "themes": ["collection", "solde"],
        "color": "#2E86C1",
        "deletedAt": null
    },
    {
        "_id": ObjectId('698ef6c131fd509f68cb0ce3'),
        "title": "Fête de la musique",
        "shopId": null,
        "startDate": ISODate("2026-02-01"),
        "endDate": ISODate("2026-02-15"),
        "description": "Text",
        "createdAt": "2026-01-31",
        "themes": ["music", "festival"],
        "color": "#e11b22",
        "deletedAt": null
    }
]);

db.events.insertOne({
    "_id": ObjectId('698ef6c131fd509f68cb0ce4'),
    "title": "Fête de la musique",
    "shopId": null,
    "startDate": ISODate("2025-12-01"),
    "endDate": ISODate("2025-12-15"),
    "description": "Text",
    "createdAt": "2026-01-31",
    "themes": ["music", "festival"],
    "color": "#e11b22",
    "deletedAt": null
});

db.requestsEvent.insertOne({
    "_id": ObjectId('6992d6b405a56d370acb0ce2'),
    "title": "Black & White",
    "shopId": ObjectId('698c5222a4c7623a67cb0ce3'),
    "startDate": ISODate("2026-02-25"),
    "endDate": ISODate("2026-03-03"),
    "description": "Text",
    "createdAt": "2026-01-31",
    "themes": ["music", "festival"],
    "color": "#e11b22",
    "status": {
        "code": "REQUEST",
        "label": "En attente de validation",
        "date": new Date()
    }
});

db.requestsEvent.insertOne({
    "title": "April Fest",
    "shopId": ObjectId('698c5222a4c7623a67cb0ce3'),
    "startDate": ISODate("2026-04-01T08:00"),
    "endDate": ISODate("2026-04-01T12:00"),
    "description": "Text",
    "createdAt": "2026-01-31",
    "themes": ["Festival", "Freestyle", "Slam"],
    "color": "#e11b22",
    "status": {
        "code": "REQUEST",
        "label": "En attente de validation",
        "date": new Date()
    }
});

db.reservations.updateOne(
    {
        _id: ObjectId("6995c497585a0ba2bc626a0b"),           // id de la réservation
        "paymentHistory._id": ObjectId("6995c497585a0ba2bc626a0c")    // mois du paiement à mettre à jour
    },
    {
        $set: { "paymentHistory.$.status": "PAID", "paymentHistory.$.paidAt": new Date() }
    }
)

db.users.insertOne({
    "_id": ObjectId('699b39e0770125b555cb0ce2'),
    "email": "Lizka@gmail.com",
    "password": "$2b$10$Vx64tQpGCEcFgIkwGdvwy.Ebiy06ds/aGVmiixvCX54lGNw.YJE86",
    "name": "Lizka",
    "role": {
        "code": "CUSTOMER",
        "label": "CUSTOMER"
    },
    "favorites": [],
    "notifications": []
});

db.products.insertOne({
    "_id": ObjectId('69a5f5d2f5a30a5da5cb0ce2'),
    "name": "Chaussures de sport",
    "unityPrice": 79.99,
    "category": {
        "code": "SHOES",
        "label": "Chaussures"
    },
    "shopId": ObjectId("698c5222a4c7623a67cb0ce3"),
    "description": "Chaussures de sport confortables et stylées.",
    "status": {
        "code": "AVAILABLE",
        "label": "Disponible"
    },
    "photos": [
        {
            "_id": "photo101",
            "url": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
            "createdAt": "2026-01-15",
            "type": {
                "code": "MAIN",
                "label": "Main"
            }
        },
        {
            "_id": "photo102",
            "url": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=300&fit=crop",
            "createdAt": "2026-01-16",
            "type": {
                "code": "DETAIL",
                "label": "Detail"
            }
        }
    ]
});