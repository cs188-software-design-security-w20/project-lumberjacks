"""Add External Link Table, remove links in Link

Revision ID: 8483cdaecfe4
Revises: 24e1a2c05a9b
Create Date: 2020-02-17 01:32:47.385501

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8483cdaecfe4'
down_revision = '24e1a2c05a9b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('external_links',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('link', sa.String(length=1024), nullable=True),
                    sa.Column('shortlink', sa.String(
                        length=64), nullable=True),
                    sa.Column('time_created', sa.DateTime(), nullable=True),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_index(op.f('ix_external_links_id'),
                    'external_links', ['id'], unique=False)
    op.create_index(op.f('ix_external_links_time_created'),
                    'external_links', ['time_created'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_external_links_time_created'),
                  table_name='external_links')
    op.drop_index(op.f('ix_external_links_id'), table_name='external_links')
    op.drop_table('external_links')
    # ### end Alembic commands ###
