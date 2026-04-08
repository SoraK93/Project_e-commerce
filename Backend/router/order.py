from fastapi import APIRouter, status

import controller.order as order
from model.database import SessionDep
from schemas.order_schema import OrderRequestModel
from services.session import valid_session_dep

router = APIRouter(
    prefix="/order",
    tags=["order"]
)


# TODO: handle this in the order page
@router.get("/", status_code=status.HTTP_200_OK, response_model=OrderRequestModel)
async def get_customer_order(db_session: SessionDep, user_session: valid_session_dep):
    order_in_db = await order.fetch_customer_orders(db_session, user_session)
    
    return OrderRequestModel.model_validate(order_in_db)


# TODO: handle this in the order page
@router.get("/{order_id}", status_code=status.HTTP_200_OK)
async def get_customer_order_by_id(db_session: SessionDep, user_session: valid_session_dep):
    await order.fetch_order_by_id(db_session, user_session)


# TODO: should save a new order to db
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
