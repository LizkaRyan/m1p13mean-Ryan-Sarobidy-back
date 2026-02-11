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
        "favorites": [
            {
                "shopId": "boutique456",
                "addedAt": "2026-01-30"
            }
        ],
        "notifications": [
            {
                "type": {
                    "code": "NEW_EVENT",
                    "label": "New event"
                },
                "payload": {
                    "eventId": "event123"
                },
                "message": "Nouvel événement au centre commercial",
                "createdAt": "2026-01-31",
                "read": false
            },
            {
                "type": {
                    "code": "NEW_PRODUCT",
                    "label": "New product"
                },
                "payload": {
                    "shopId": "boutique456",
                    "productId": "product789"
                },
                "message": "Nouveau produit chez votre boutique favori",
                "createdAt": "2026-01-31",
                "read": false
            },
            {
                "type": {
                    "code": "NEW_RESERVATION",
                    "label": "New reservation"
                },
                "payload": {
                    "reservationId": "res123",
                    "boutiqueId": "boutique456",
                    "roomId": "room12",
                    "userId": "user999"
                },
                "message": "Nouvelle réservation de salle",
                "createdAt": "2026-01-31",
                "read": false
            }
        ]
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
])

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
    }
]);

db.requestsReservation.insertMany([
    {
        "_id": ObjectId('698c53fba4c7623a67cb0ce4'),
        "shopId": ObjectId("698c5222a4c7623a67cb0ce3"),
        "roomId": ObjectId('6988d13bf45d21d2d1137468'),
        "beginingDate": "2026-02-15",
        "endingDate": "2026-05-15",
    }
]);