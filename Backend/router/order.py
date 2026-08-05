from uuid import UUID

from fastapi import APIRouter, status

import controller.order as order
from model.database import SessionDep
from schemas.order_schema import OrderRequestModel, OrderResponseModel
from services.session import valid_session_dep

router = APIRouter(
    prefix="/order",
    tags=["order"]
)


@router.get("/", status_code=status.HTTP_200_OK, response_model=OrderResponseModel)
async def get_customer_order(db_session: SessionDep, user_session: valid_session_dep) -> OrderResponseModel:
    order_in_db = await order.fetch_customer_orders(db_session, user_session)

    return OrderResponseModel(data=order_in_db, message="Order list retrieved successfully")


@router.get("/{order_id}", status_code=status.HTTP_200_OK, response_model=OrderResponseModel)
async def get_customer_order_by_id(db_session: SessionDep, user_session: valid_session_dep,
                                   order_id: UUID) -> OrderResponseModel:
    order_in_db = await order.fetch_order_by_id(db_session, user_session, order_id)
    print("ORDER BY ID!!!!!!!!!", order_in_db)
    return OrderResponseModel(data=order_in_db, message="Order retrieved successfully")


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_customer_order(db_session: SessionDep, user_session: valid_session_dep,
                                order_data: OrderRequestModel):
    await order.create_new_order(db_session, user_session, order_data)

    return {"message": "Order created successfully"}


# TODO: should edit cart, user delivery detail and payment mode
@router.put("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def update_customer_order_by_id(db_session: SessionDep, user_session: valid_session_dep):
    await order.edit_order_details(db_session, user_session)


# TODO: cancel a successfully created order. It's not a delete, should show in customers history.
@router.patch("/{order_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_customer_order_by_id(db_session: SessionDep, user_session: valid_session_dep):
    await order.cancel_order_by_id(db_session, user_session)
