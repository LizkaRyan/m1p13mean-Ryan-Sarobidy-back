db.users.insertMany([
    {
        "__id": ObjectId('6983520fc0ddee2551cb0ce2'),
        "email": "Rabe@gmail.com",
        "password": "itu16",
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
        "__id": ObjectId('6983520fc0ddee2551cb0ce3'),
        "email": "Admin@gmail.com",
        "password": "itu16",
        "name": "Admin",
        "role": {
            "code": "ADMIN",
            "label": "Admin"
        },
        "favorites": [],
        "notifications": []
    }
])