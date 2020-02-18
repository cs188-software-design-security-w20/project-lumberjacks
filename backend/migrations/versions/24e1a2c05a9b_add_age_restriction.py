"""add age-restriction

Revision ID: 24e1a2c05a9b
Revises: 221d38dd7c6f
Create Date: 2020-02-12 14:40:41.084594

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '24e1a2c05a9b'
down_revision = '221d38dd7c6f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('links', sa.Column('age_restricted', sa.Boolean(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('links', 'age_restricted')
    # ### end Alembic commands ###