"""initial migration

Revision ID: 4ea7392730b8
Revises: 
Create Date: 2024-02-12 12:46:24.944280

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4ea7392730b8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_name', sa.String(length=255), nullable=False),
    sa.Column('password_hash', sa.String(length=255), nullable=False),
    sa.Column('password', sa.String(length=255), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_name')
    )
    op.create_table('restaurant_bookings',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('business_id', sa.String(), nullable=False),
    sa.Column('restaurant_name', sa.String(), nullable=False),
    sa.Column('party_size', sa.Integer(), nullable=True),
    sa.Column('time_stamp', sa.String(), nullable=True),
    sa.Column('bid_amount', sa.Integer(), nullable=True),
    sa.Column('review', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_restaurant_bookings_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('restaurant_bookings')
    op.drop_table('users')
    # ### end Alembic commands ###